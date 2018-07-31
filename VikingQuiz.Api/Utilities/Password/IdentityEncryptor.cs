using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VikingQuiz.Api.Utilities.Password
{
    public class IdentityEncryptor : PasswordEncryptor
    {
        public string Encrypt(string password)
        {
            return password;
        }
    }
}
