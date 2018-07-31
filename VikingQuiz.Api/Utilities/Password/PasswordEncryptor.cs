using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VikingQuiz.Api.Utilities
{
    public interface PasswordEncryptor
    {
        string Encrypt(string password);
    }
}
