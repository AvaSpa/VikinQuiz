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
using VikingQuiz.Api.Controllers;
using VikingQuiz.Api.Controllers.SignalR.Services;

namespace VikingQuiz.Api
{
    public class Startup
    {
        private static string sqlConnection;

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

            services.AddDbContext<VikinQuizContext>(options => options.UseSqlServer(sqlConnection));

            services.AddScoped<AnswerRepository, AnswerRepository>();
            services.AddScoped<GameRepository, GameRepository>();
            services.AddScoped<PlayerRepository, PlayerRepository>();
            services.AddScoped<QuestionRepository, QuestionRepository>();
            services.AddScoped<QuizRepository, QuizRepository>();
            services.AddScoped<UserRepository, UserRepository>();
            services.AddScoped<PlayerGameRepository, PlayerGameRepository>();
            services.AddScoped<AuthenticationService, AuthenticationService>();
            services.AddScoped<IEntityMapper<UserViewModel, User>, UserViewModelToEntityMapper>();
            services.AddScoped<IEntityMapper<User, UserViewModel>, UserToViewModelMapper>();
            services.AddScoped<IEntityMapper<Answer, AnswerViewModel>, AnswerToViewModelMapper>();
            services.AddScoped<IEntityMapper<AnswerViewModel, Answer>, AnswerViewModelToEntityMapper>();
            services.AddScoped<IEntityMapper<Game, GameViewModel>, GameToViewModelMapper>();
            services.AddScoped<IEntityMapper<GameViewModel, Game>, GameViewModelToEntityMapper>();
            services.AddScoped<IEntityMapper<Player, PlayerViewModel>, PlayerToViewModelMapper>();
            services.AddScoped<IEntityMapper<PlayerViewModel, Player>, PlayerViewModelToEntityMapper>();
            services.AddScoped<IEntityMapper<Question, QuestionViewModel>, QuestionToViewMapper>();
            services.AddScoped<IEntityMapper<QuestionViewModel, Question>, QuestionViewModelToEntityMapper>();
            services.AddScoped<IEntityMapper<QuizViewModel, Quiz>, QuizViewModelToEntityMapper>();
            services.AddScoped<IEntityMapper<Quiz, QuizViewModel>, QuizToViewModelMapper>();
            services.AddScoped<IEntityMapper<PlayerGame, PlayerGameViewModel>, PlayerGameToViewModelMapper>();
            services.AddScoped<IEntityMapper<PlayerGameViewModel, PlayerGame>, PlayerGameViewModelToEntityMapper>();
            services.AddSingleton<IRoomService, RoomsService>();

            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                sqlConnection =  @"Server=(localdb)\MSSQLLocalDB;Database=VikinQuiz;Trusted_Connection=True;ConnectRetryCount=0";

            }

            if (env.IsProduction())
            {
                sqlConnection =
                    @"Server=tcp:intershipwirtek.database.windows.net,1433;Initial Catalog=VikinQuiz;Persist Security Info=False;User ID=intershipwirtek;Password=QAZwsx123;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

            }
            app.UseCors("CorsPolicy");

            app.UseAuthentication();

            app.UseMvc();

            app.UseSignalR(routes =>
            {
                routes.MapHub<SignalRPlaceholder>("/hello");
                routes.MapHub<GameMasterController>("/gamemaster");
            });

            //TODO:will be used in production

            /*

            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>()
                .CreateScope())
            {
                serviceScope.ServiceProvider.GetService<VikinQuizContext>().Database.Migrate();
            }*/
        }
    }
}
