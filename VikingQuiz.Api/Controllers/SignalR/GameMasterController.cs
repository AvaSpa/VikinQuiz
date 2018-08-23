using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Controllers.SignalR.DTOs;
using VikingQuiz.Api.Controllers.SignalR.Services;
using VikingQuiz.Api.Mappers;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.Repositories;
using VikingQuiz.Api.Utilities;
using VikingQuiz.Api.ViewModels;

namespace VikingQuiz.Api.Controllers.SignalR
{
    public class GameMasterController : Hub
    {
        private IRoomService RoomService;
        private QuizRepository quizRepository;
        private PlayerRepository playerRepository;
        private GameRepository gameRepository;
        IEntityMapper<Answer, AnswerViewModel> answerMapper;
        private const uint CodeLength = 6;

        public GameMasterController(IRoomService Rooms, QuizRepository quizRepository, PlayerRepository playerRepository, GameRepository gameRepository, IEntityMapper<Answer, AnswerViewModel> answerMapper)
        {
            this.RoomService = Rooms;
            this.quizRepository = quizRepository;
            this.playerRepository = playerRepository;
            this.gameRepository = gameRepository;
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
        /// !Event! When the controller detects that there are no more 
        /// </summary>
        public void AllPlayersAnswered(GameInstance gameInstance)
        {
            string code = RoomService.PlayersToRooms[gameInstance.GameMasterId];
            Clients.Group(code).SendAsync("NextQuestion");
            Clients.GroupExcept(code, gameInstance.GameMasterId).SendAsync("SendCorrectAnswerId", gameInstance.QuizQuestionsAnswers.answers[gameInstance.CurrentQuestion].Item2);
        }







        /// <summary>
        /// !Event! When the controller detects that a game has come to an end
        /// this method is called and announces everybody that the game has ended
        /// </summary>
        public async void NoMoreQuestions(GameInstance gameInstance) {
            string code = RoomService.PlayersToRooms[gameInstance.GameMasterId];
            GameInstance instance = RoomService.Rooms[code];
            instance.OrderedPlayers = OrderPlayers(RoomService.Rooms[code].Players.Values);
            RoomService.Rooms[code] = instance;

            await Clients.Group(code).SendAsync("GameIsOver");
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
            Game game = new Game { QuizId = quizId, GameDate = DateTime.Now, Code = code };
            gameRepository.Create(game);

            QuizQuestionsAnswers quizQuestionsAnswers = quizRepository.GetQuizByIdAndAssociatedQuestionsAndAnswers(quizId);
            GameInstance gameInstance = new GameInstance(quizQuestionsAnswers, Context.ConnectionId, AllPlayersAnswered, NoMoreQuestions, game.Id);

            RoomService.Rooms.Add(code, gameInstance);
            RoomService.PlayersToRooms.Add(Context.ConnectionId, code);
            return code;
        }

        /// <summary>
        /// When an administrator presses start game
        /// this method tells all players that the game has started
        /// </summary>
        public void BeginGame(string code)
        {
            //string code = RoomService.PlayersToRooms[Context.ConnectionId];
            //Clients.All.SendAsync("GameStarted");
            Clients.Groups(code).SendAsync("GameStarted");
        }

        /// <summary>
        /// When a player introduces his game code and presses start
        /// this method connects him to the correct game room
        /// </summary>
        public async Task<int> ConnectToGame(string Code, string Name, string PictureUrl)
        {
            //save the player
            GameInstance instance = RoomService.Rooms[Code];

            Player player = new Player
            {
                Name = Name,
                PictureUrl = PictureUrl
            };
            player = await Task.Run(() => playerRepository.AddPlayer(player, instance.GameId));

            //add player to room

            await Groups.AddToGroupAsync(Context.ConnectionId, Code);
            GamePlayer gamePlayer = new GamePlayer(player.Id, player.Name, player.PictureUrl);
            RoomService.Rooms[Code].Players.Add(Context.ConnectionId, gamePlayer);
            RoomService.PlayersToRooms.Add(Context.ConnectionId, Code);

            //notify GM that a new player entered
            string gameMaster = RoomService.Rooms[Code].GameMasterId;
            await Clients.Client(gameMaster).SendAsync("NewPlayerHasConnected", Name, PictureUrl);
            return player.Id;
        }

        /// <summary>
        /// When the gamemaster moves to a new question
        /// he makes a request for the data for that question
        /// </summary>
        public QuestionViewModel GetCurrentQuestion(string code)
        {
            int currentQuestionId = RoomService.Rooms[code].CurrentQuestion;
            GameInstance gameInstance = RoomService.Rooms[code];

            int realQuestionIndex = gameInstance.QuizQuestionsAnswers.questions[currentQuestionId].Id; // get the id of the actual question from the DB
            int realAnswersKey = 0; 

            foreach(var answer in gameInstance.QuizQuestionsAnswers.answers) {
                var questionId = answer.Value.Item1[0].QuestionId;
                if (questionId == realQuestionIndex) {
                    realAnswersKey = answer.Key;
                }
                
            }

            QuestionViewModel questionViewModel = new QuestionViewModel {
                Id = realQuestionIndex,
                Text = gameInstance.QuizQuestionsAnswers.questions[currentQuestionId].Text,
                Answers = gameInstance.QuizQuestionsAnswers.answers[realAnswersKey].Item1.Select(a => answerMapper.Map(a)).ToList(),
                CorrectAnswerId = gameInstance.QuizQuestionsAnswers.answers[realAnswersKey].Item2
            };

            return questionViewModel;

        }

        /// <summary>
        /// When the gamemaster decides to move on to the next question
        /// this method tells all players in the room to move on as well
        /// </summary>
        public bool GoToNextQuestion(string code)
        {
            bool areThereMoreQuestions = false;
            //string code = RoomService.PlayersToRooms[Context.ConnectionId];

            GameInstance gameInstance = RoomService.Rooms[code];
            gameInstance.CurrentQuestion = ++gameInstance.CurrentQuestion;
            gameInstance.PlayersThatAnsweredCurrentQuestion = gameInstance.Players.Count;
            RoomService.Rooms[code] = gameInstance;
            if(!checkIfThereAreNoMoreQuestions(gameInstance)) {
                areThereMoreQuestions = true;
                Clients.Group(code).SendAsync("NextQuestion");
            }
            return areThereMoreQuestions;

        }







        /// <summary>
        /// When a player answers a question, the front end sends the answer and the time
        /// this method checks if the answer is correct (adjusting the player's score and time)
        /// and decrements the number of players that need to still answer
        /// </summary>
        public void PlayerAnsweredQuestion(int chosenAnswer, double time)
        {
            string code = RoomService.PlayersToRooms[Context.ConnectionId];
            GameInstance gameInstance = RoomService.Rooms[code];
            GamePlayer gamePlayer = gameInstance.Players[Context.ConnectionId];


            int scoreToAdd = gameInstance.QuizQuestionsAnswers.answers[gameInstance.CurrentQuestion].Item2 == chosenAnswer ? 10 : 0;

            gamePlayer.score += scoreToAdd;
            gamePlayer.time += time;

            gameInstance.Players[Context.ConnectionId] = gamePlayer;
            gameInstance.PlayersThatAnsweredCurrentQuestion--;
            checkIfAllPlayersAnswered(gameInstance);

            RoomService.Rooms[code] = gameInstance;

        }






        /// <summary>
        /// When a player gets to the end screen he makes a request to see how he ranked
        /// </summary>
        public PlayerRankDTO GetPlayerWithRank()
        {
            string code = RoomService.PlayersToRooms[Context.ConnectionId];
            GamePlayer gamePlayer = RoomService.Rooms[code].Players[Context.ConnectionId];
            PlayerRankDTO playerRank = new PlayerRankDTO
            {
                name = gamePlayer.name,
                pictureUrl = gamePlayer.pictureUrl,
                rank = RoomService.Rooms[code].OrderedPlayers.IndexOf(gamePlayer),
                numberOfPlayers = RoomService.Rooms[code].OrderedPlayers.Count()
            };
            return playerRank;
        }

        /// <summary>
        /// When the gamemaster gets to the end screen he makes a request to get the top 3 players
        /// </summary>
        public WinnersDTO GetWinners(string code )
        {
            //string code = RoomService.PlayersToRooms[Context.ConnectionId];
            PlayerDTO[] top3Players = RoomService.Rooms[code]
                .OrderedPlayers
                .Take(3)
                .Select(dto => new PlayerDTO { name = dto.name, pictureUrl = dto.pictureUrl })
                .ToArray();
            WinnersDTO winners = new WinnersDTO(top3Players);
            return winners;

        }

        private bool checkIfAllPlayersAnswered(GameInstance instance) 
        {
            bool condition = instance.PlayersThatAnsweredCurrentQuestion == 0;
            if (condition) {
                AllPlayersAnswered(instance);
            }
            return condition;
        }

        private bool checkIfThereAreNoMoreQuestions(GameInstance instance) {
            bool condition = instance.CurrentQuestion == instance.QuizQuestionsAnswers.questions.Count;
            if (instance.CurrentQuestion == instance.QuizQuestionsAnswers.questions.Count) {
                NoMoreQuestions(instance);
            }
            return condition;
        }


        public IOrderedEnumerable<GamePlayer> OrderPlayers(IEnumerable<GamePlayer> players)
        {
            return players.OrderByDescending(p => p.score).ThenBy(p => p.time);
        }
    }
}



/*
                 if (_players == 0)
                {
                    AllPlayersAnsweredCallback(this);
                }

                    _question = value;
                if (_question == QuizQuestionsAnswers.questions.Count)
                {
                    NoMoreQuestionsCallback(this);
                }
     */
