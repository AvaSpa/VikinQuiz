using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using VikingQuiz.Api.Models;
using Microsoft.EntityFrameworkCore;
using VikingQuiz.Api.Repositories;
using VikingQuiz.Api.Mappers;
using VikingQuiz.Api.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using VikingQuiz.Api.Utilities;

namespace VikingQuiz.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options => {
                    options.TokenValidationParameters = new TokenValidationParameters {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = Configuration["Jwt:Issuer"],
                        ValidAudience = Configuration["Jwt:Issuer"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
                    };
                });

            services.AddMvc();

            var connection = @"Server=(localdb)\MSSQLLocalDB;Database=VikinQuiz;Trusted_Connection=True;ConnectRetryCount=0";
            services.AddDbContext<VikinQuizContext>(options => options.UseSqlServer(connection));

            services.AddScoped<AnswerRepo, AnswerRepo>();
            services.AddScoped<GameRepo, GameRepo>();
            services.AddScoped<PlayerRepo, PlayerRepo>();
            services.AddScoped<QuestionRepo, QuestionRepo>();
            services.AddScoped<QuizRepo, QuizRepo>();
            services.AddScoped<UserRepo, UserRepo>();
            services.AddScoped<AuthenticationService, AuthenticationService>();
            services.AddScoped<IEntityMapper<UserViewModel, User>, UserViewModelToEntityMapper>();
            services.AddScoped<IEntityMapper<User, UserViewModel>, UserToViewModelMapper>();
            services.AddScoped<IEntityMapper<Answer, AnswerViewModel>, AnswerToViewModelMapper>();
            services.AddScoped<IEntityMapper<AnswerViewModel, Answer>, AnswerViewModelToEntityMapper>();
            services.AddScoped<IEntityMapper<Game, GameViewModel>, GameToViewMapper>();
            services.AddScoped<IEntityMapper<GameViewModel, Game>, GameViewModelToPlayerMapper>();
            services.AddScoped<IEntityMapper<Player, PlayerViewModel>, PlayerToViewMapper>();
            services.AddScoped<IEntityMapper<Question, QuestionViewModel>, QuestionToViewMapper>();
            services.AddScoped<IEntityMapper<QuizViewModel, Quiz>, QuizViewModelToEntityMapper>();
            services.AddScoped<IEntityMapper<Quiz, QuizViewModel>, QuizToViewModelMapper>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseCors("CorsPolicy");

            app.UseAuthentication();

            app.UseMvc();
        }
    }
}
