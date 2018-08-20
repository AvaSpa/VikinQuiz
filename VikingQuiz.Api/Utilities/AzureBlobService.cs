using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.WindowsAzure.Storage.Shared.Protocol;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;

namespace VikingQuiz.Api.Utilities

{
    public class AzureBlobService
    {
        
        public Uri urlPath { get; set; }

        public async Task<bool> InitializeBlob()
        {
            userContainer = blobClient.GetContainerReference(containerName);
            if (!await userContainer.CreateIfNotExistsAsync())
            {
                return false;
            }
            BlobContainerPermissions permissions = new BlobContainerPermissions
            {
                PublicAccess = BlobContainerPublicAccessType.Blob
            };
            await userContainer.SetPermissionsAsync(permissions);
            serviceProperties = await SetServiceProperties();
            return true;
        }

        public async Task<string> UploadPhoto(IFormFile file)
        {
            var filePath = Path.GetTempFileName();
            using (var stream = new FileStream(filePath, FileMode.Create)) {
                await file.CopyToAsync(stream);
            }

            string contentType = file.ContentType;

            var extension = getFileExtension(contentType);

            string imageFileName = Guid.NewGuid().ToString() + (Int32)(DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1))).TotalSeconds + extension;

            CloudBlockBlob cloudBlockBlob = userContainer.GetBlockBlobReference(imageFileName);
            cloudBlockBlob.Properties.ContentType = contentType;

            await cloudBlockBlob.UploadFromFileAsync(filePath);
            return imageFileName;
        }

        public async Task<bool> DeletePhoto(string imageFileNameWithExtension)
        {
            var blob = userContainer.GetBlockBlobReference(imageFileNameWithExtension);
            return await blob.DeleteIfExistsAsync();
        }

        public AzureBlobService()
        {
            string storageConnectionString = "DefaultEndpointsProtocol=https;AccountName=intershipwirtekblob;AccountKey=shTUho2siiIL/ifrGoABOPLJuqLB4UPnGqDMNYiSBiE7IeKxWTLzEtWCm2pgwuvAs5odaGllkGawS8KbdHCtyQ==;EndpointSuffix=core.windows.net";
            if (CloudStorageAccount.TryParse(storageConnectionString, out this.account))
            {
                account = CloudStorageAccount.Parse(storageConnectionString);
                urlPath = account.BlobStorageUri.PrimaryUri;
                blobClient = account.CreateCloudBlobClient();
            }
            else
            {
                throw new StorageException();
            }
        }

        private string getFileExtension (string contentType) {
            Dictionary<string, string> extensions = new Dictionary<string, string>();

            extensions.Add("image/png", ".png");
            extensions.Add("image/jpeg", ".jpg");
            extensions.Add("image/gif", ".jpg");

            return extensions[contentType];
        }


        private const string containerName = "users";

        private CloudStorageAccount account;
        private CloudBlobClient blobClient;
        private ServiceProperties serviceProperties;
        private CloudBlobContainer userContainer;

        private async Task<ServiceProperties> SetServiceProperties()
        {
            var serviceProperties = await blobClient.GetServicePropertiesAsync();
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
    }
}

