using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace VikingQuiz.Api.Utilities
{
    public static class UserExtensions
    {
        public static int GetUserId(this IEnumerable<Claim> user)
        {
            string userId = user.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
            return int.Parse(userId);
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
