using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.WindowsAzure.Storage.Shared.Protocol;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;

namespace VikingQuiz.Api.Utilities
{
    public class AzureBlobService
    {
        private CloudStorageAccount account;
        private CloudBlobClient blobClient;
        private ServiceProperties serviceProperties;
        private CloudBlobContainer userContainer;
        public Uri urlPath;

        public async Task<bool> InitializeBlob() // blob init
        {

            //CloudUri = blobClient.BlobStorageUri.PrimaryUri.ToString();


            userContainer = blobClient.GetContainerReference("users"); // get container reference
            if(!await userContainer.CreateIfNotExistsAsync())
            {
                return false;
            }
            await userContainer.CreateIfNotExistsAsync(); // create that container if it does not exist
            // set permissions of the user container to be public
            BlobContainerPermissions permissions = new BlobContainerPermissions
            {
                PublicAccess = BlobContainerPublicAccessType.Blob
            };
            await userContainer.SetPermissionsAsync(permissions);
            serviceProperties = await SetServiceProperties();
            return true;

        }

        private async Task<ServiceProperties> SetServiceProperties()
        {
            var serviceProperties = await blobClient.GetServicePropertiesAsync();

            // set Cors properties
            serviceProperties.Cors.CorsRules.Clear();

            serviceProperties.Cors.CorsRules.Add(new CorsRule()
            {
                AllowedHeaders = { "*" },
                AllowedMethods = CorsHttpMethods.Get | CorsHttpMethods.Head | CorsHttpMethods.Post | CorsHttpMethods.Put | CorsHttpMethods.Delete,
                AllowedOrigins = { "*" },
                ExposedHeaders = { "*" },
                MaxAgeInSeconds = 1800
            });

            await blobClient.SetServicePropertiesAsync(serviceProperties);

            return serviceProperties;
        }


        public async Task<string> UploadPhoto(string path, string contentType)
        {
            var extension = contentType == "image/png" ? ".png" :
                            contentType == "image/jpeg" ? ".jpeg" :
                            contentType == "image/gif" ? ".gif" : null;

            string imgName = Guid.NewGuid().ToString() + (Int32)(DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1))).TotalSeconds + extension;

            CloudBlockBlob cloudBlockBlob = userContainer.GetBlockBlobReference(imgName);
            cloudBlockBlob.Properties.ContentType = contentType;

            await cloudBlockBlob.UploadFromFileAsync(path);
            return imgName;
        }

        public AzureBlobService()
        {
            // use TryParse to check connection
            //account = CloudStorageAccount.DevelopmentStorageAccount;
            string storageConnectionString = "DefaultEndpointsProtocol=https;AccountName=intershipwirtekblob;AccountKey=shTUho2siiIL/ifrGoABOPLJuqLB4UPnGqDMNYiSBiE7IeKxWTLzEtWCm2pgwuvAs5odaGllkGawS8KbdHCtyQ==;EndpointSuffix=core.windows.net";
            account = CloudStorageAccount.Parse(storageConnectionString);
            urlPath = account.BlobStorageUri.PrimaryUri;

            blobClient = account.CreateCloudBlobClient();
        }
    }
}

