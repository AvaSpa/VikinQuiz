using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VikingQuiz.Api.Utilities
{
    public static class ModelStateExtension
    {
        public static IEnumerable<string> GetErrors(this ModelStateDictionary ModelState)
        {
            return ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
        }
    }
}
