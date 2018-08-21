using Microsoft.AspNetCore.Http;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.WindowsAzure.Storage.Shared.Protocol;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace VikingQuiz.Api.Utilities

{
    public class AzureBlobService
    {

        public AzureBlobService(string containerName)
        {
            this.containerName = containerName;
            InitalizeAsync();
        }


        public async Task<string> UploadPhotoAsync(IFormFile file)
        {
            var filePath = Path.GetTempFileName();
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
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
        public async Task<bool> DeletePhotoAsync(string imageFileNameWithExtension)
        {
            var blob = userContainer.GetBlockBlobReference(imageFileNameWithExtension);
            return await blob.DeleteIfExistsAsync();
        }


        public string GetFullUrlOfFileName(string fileNameWithExtension)
        {
            string fullUrlPathOfImage;

            fullUrlPathOfImage = account.BlobStorageUri.PrimaryUri.ToString();
            fullUrlPathOfImage += containerName + "/";
            fullUrlPathOfImage += fileNameWithExtension;

            return fullUrlPathOfImage;
        }
        public string GetFullUrlOfContainer()
        {

            string fullUrlPathOfImage;

            fullUrlPathOfImage = account.BlobStorageUri.PrimaryUri.ToString();
            fullUrlPathOfImage += containerName + "/";

            return fullUrlPathOfImage;
        }





        private readonly string storageConnectionString = "DefaultEndpointsProtocol=https;AccountName=intershipwirtekblob;AccountKey=shTUho2siiIL/ifrGoABOPLJuqLB4UPnGqDMNYiSBiE7IeKxWTLzEtWCm2pgwuvAs5odaGllkGawS8KbdHCtyQ==;EndpointSuffix=core.windows.net";
        private string containerName;

        private CloudStorageAccount account;
        private CloudBlobClient blobClient;
        private CloudBlobContainer userContainer;


        private async void InitalizeAsync()
        {
            IntializeAzureClient();
            await InitializeContainerAsync();
            await SetServicePropertiesAsync();
        }
        private void IntializeAzureClient()
        {
            if (CloudStorageAccount.TryParse(storageConnectionString, out this.account))
            {
                account = CloudStorageAccount.Parse(storageConnectionString);
                blobClient = account.CreateCloudBlobClient();
            }
            else
            {
                throw new StorageException();
            }
        }
        private async Task<bool> InitializeContainerAsync()
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

            return true;
        }
        private async Task<ServiceProperties> SetServicePropertiesAsync()
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

        private string getFileExtension(string contentType)
        {
            Dictionary<string, string> extensions = new Dictionary<string, string>();

            extensions.Add("image/png", ".png");
            extensions.Add("image/jpeg", ".jpg");
            extensions.Add("image/gif", ".jpg");

            return extensions[contentType];
        }
    }
}
