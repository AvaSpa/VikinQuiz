using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.ViewModels;
using VikingQuiz.Api.Mappers;

namespace VikingQuiz.Api.Mappers
{
    public class UserToViewModelMapper : IEntityMapper<User, UserViewModel>
    {
        public UserViewModel Map(User user)
        {
            var result = new UserViewModel
            {
                Password = user.Pass,
                Username = user.Username,
                Email = user.Email,
                Id = user.Id,
                PictureUrl = user.PictureUrl
            };
            return result;
        }
    }
}
