using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Controllers.SignalR.Services;
using VikingQuiz.Api.Mappers;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.Repositories;
using VikingQuiz.Api.ViewModels;

namespace VikingQuiz.Api.Controllers
{
    public struct GamePlayer
    {
        public int score;
        public double time;
    }

    public struct GameInstance
    {
        public QuizQuestionsAnswers QuizQuestionsAnswers;
        public IList<GamePlayer> Players;
        public int CurrentQuestion;
        public string GameMasterId;

        public GameInstance(QuizQuestionsAnswers QuizQuestionsAnswers, string GameMasterId)
        {
            this.QuizQuestionsAnswers = QuizQuestionsAnswers;
            this.GameMasterId = GameMasterId;
            this.CurrentQuestion = 0;
            this.Players = new List<GamePlayer>();
        }
    }

    public class GameMasterController : Hub
    {
        private IRoomService Rooms;
        private QuizRepository quizRepository;
        private PlayerRepository playerRepository;
        IEntityMapper<Answer, AnswerViewModel> answerMapper;
        private const uint CodeLength = 6;

        public GameMasterController(IRoomService Rooms, QuizRepository quizRepository, PlayerRepository playerRepository, IEntityMapper<Answer, AnswerViewModel> answerMapper)
        {
            this.Rooms = Rooms;
            this.quizRepository = quizRepository;
            this.playerRepository = playerRepository;
            this.answerMapper = answerMapper;
        }

        private string GenerateCode()
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            string code = "";
            for (int i = 0; i < CodeLength; i++)
            {
                code += chars[random.Next(0, chars.Length)];
            }

            return code;
        }
        
        /// <summary>
        /// When an administrator decides to create a room
        /// this method generates a code, a room 
        /// and sets the administrator as the game master of the room
        /// </summary>
        public async Task<string> CreateGame(int quizId)
        {
            string code = GenerateCode();
            await Groups.AddToGroupAsync(Context.ConnectionId, code);
            GameInstance gameInstance = new GameInstance(quizRepository.GetQuizByIdAndAssociatedQuestionsAndAnswers(quizId), Context.ConnectionId);
            Rooms.Rooms.Add(code, gameInstance);
            Rooms.Owners.Add(Context.ConnectionId, code);
            return code;
        }

        /// <summary>
        /// When an administrator presses start game
        /// this method tells all players that the game has started
        /// </summary>
        public Task BeginGame()
        {
            string code = Rooms.Owners[Context.ConnectionId];
            return Clients.Groups(code).SendAsync("GameStarted");
        }

        /// <summary>
        /// When a player introduces his game code and presses start
        /// this method connects him to the correct game room
        /// </summary>
        public void ConnectToGame(string Code, string Name, string PictureUrl)
        {
            //save the player
            Player player = new Player
            {
                Name = Name,
                PictureUrl = PictureUrl
            };
            Task.Run(() => playerRepository.AddPlayer(player, Code));

            //add player to room
            Groups.AddToGroupAsync(Context.ConnectionId, Code);

            //notify GM that a new player entered
            string gameMaster = Rooms.Rooms[Code].GameMasterId;
            Clients.Client(gameMaster).SendAsync("NewPlayerConnected", Name, PictureUrl);
        }

        public QuestionViewModel GetCurrentQuestion()
        {
            string code = Rooms.Owners[Context.ConnectionId];
            int currentQuestionId = Rooms.Rooms[code].CurrentQuestion;
            GameInstance gameInstance = Rooms.Rooms[code];
            QuestionViewModel questionViewModel = new QuestionViewModel
            {
                Id = gameInstance.QuizQuestionsAnswers.questions[currentQuestionId].Id,
                Text = gameInstance.QuizQuestionsAnswers.questions[currentQuestionId].Text,
                Answers = gameInstance.QuizQuestionsAnswers.answers[currentQuestionId].Item1.Select(a => answerMapper.Map(a)).ToList(),
                CorrectAnswerId = gameInstance.QuizQuestionsAnswers.answers[currentQuestionId].Item2
            };
            return questionViewModel;
        }

        //GetNextQuestion
        public void PlayerAnsweredQuestion()
        {

        }

        //SendChosenAnswerId
        //SendCorrectAnswerId
        //ProceedToNextAnswers
        //GameIsOver
    }
}
