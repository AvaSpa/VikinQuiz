using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.ViewModels;
using VikingQuiz.Api.Mappers;

namespace VikingQuiz.Api.Mappers
{
    public class UserViewModelToEntityMapper : IEntityMapper<UserViewModel, User>
    {
        public User Map(UserViewModel userViewModel)
        {
            var result = new User
            {
                Pass = userViewModel.Password,
                Username = userViewModel.Username,
                Email = userViewModel.Email,
                Id = userViewModel.Id,
                PictureUrl = userViewModel.PictureUrl
            };
            return result;
        }
    }
}
