using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace VikingQuiz.Api.Utilities
{
    public static class EncodingExtension
    {
        public static string Base64Encoder(this string toEncode)
        {
            byte[] textAsBytes = Encoding.UTF8.GetBytes(toEncode);
            string encodedText = Convert.ToBase64String(textAsBytes);
            return encodedText;
        }

        public static string SHA256Encrypt(this string password)
        {
            SHA256 sha256 = SHA256Managed.Create();
            byte[] passwordAsBytes = Encoding.UTF8.GetBytes(password);
            byte[] hashedPassword = sha256.ComputeHash(passwordAsBytes);

            StringBuilder result = new StringBuilder();
            for (int i = 0; i < hashedPassword.Length; i++)
            {
                result.Append(hashedPassword[i].ToString("X2"));
                // Normal format:   13
                // 'X2' format:     0D
            }
            return result.ToString();
        }
    }
}
