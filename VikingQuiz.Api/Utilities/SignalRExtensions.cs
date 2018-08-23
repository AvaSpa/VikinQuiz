using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Controllers.SignalR.Services;

namespace VikingQuiz.Api.Utilities
{
    public static class SignalRExtensions
    {
        public static int IndexOf<T>(this IEnumerable<T> source, T value)
        {
            int index = 0;
            var comparer = EqualityComparer<T>.Default;
            foreach (T item in source)
            {
                if (comparer.Equals(item, value)) return index;
                index++;
            }
            return -1;
        }
    }
}
