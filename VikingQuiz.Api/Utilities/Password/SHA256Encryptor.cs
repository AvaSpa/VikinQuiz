using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace VikingQuiz.Api.Utilities.Password
{
    public class SHA256Encryptor : PasswordEncryptor
    {
        //codeshare.co.uk/blog/sha-256-and-sha-512-hash-examples/
        public string Encrypt(string password)
        {
            SHA256 sha256 = SHA256Managed.Create();
            byte[] bytes = Encoding.UTF8.GetBytes(password);
            byte[] hash = sha256.ComputeHash(bytes);
            return GetStringFromHash(hash);
        }

        private string GetStringFromHash(byte[] hash)
        {
            StringBuilder result = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
            {
                result.Append(hash[i].ToString("X2"));
                // Normal format:   13
                // 'X2' format:     0D
            }
            return result.ToString();
        }
    }
}
