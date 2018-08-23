using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Controllers.SignalR.Services;
using VikingQuiz.Api.Mappers;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.Repositories;
using VikingQuiz.Api.Utilities;
using VikingQuiz.Api.ViewModels;

namespace VikingQuiz.Api.Controllers
{
    public class PlayerDTO
    {
        public string name;
        public string pictureUrl;
    }
    public class PlayerRankDTO : PlayerDTO
    {
        public int rank;
        public int numberOfPlayers;
    }

    public class WinnersDTO
    {
        public PlayerDTO[] winners;
        public WinnersDTO(PlayerDTO[] winners) { this.winners = winners; }
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
        /// !Event! When the controller detects that there are no more 
        /// </summary>
        public void AllPlayersAnswered(GameInstance gameInstance)
        {
            string code = Rooms.PlayersToRooms[gameInstance.GameMasterId];
            Clients.Client(gameInstance.GameMasterId).SendAsync("EverybodyAnswered");
            Clients.GroupExcept(code, gameInstance.GameMasterId).SendAsync("SendCorrectAnswerId", gameInstance.QuizQuestionsAnswers.answers[gameInstance.CurrentQuestion].Item2);
        }

        /// <summary>
        /// !Event! When the controller detects that a game has come to an end
        /// this method is called and announces everybody that the game has ended
        /// </summary>
        public void NoMoreQuestions(GameInstance gameInstance)
        {
            string code = Rooms.PlayersToRooms[gameInstance.GameMasterId];
            Clients.Group(code).SendAsync("GameIsOver");
            GameInstance instance = Rooms.Rooms[code];
            instance.OrderedPlayers = OrderPlayers(Rooms.Rooms[code].Players.Values);
            Rooms.Rooms[code] = instance;
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
            GameInstance gameInstance = new GameInstance(quizRepository.GetQuizByIdAndAssociatedQuestionsAndAnswers(quizId), Context.ConnectionId, AllPlayersAnswered, NoMoreQuestions);
            Rooms.Rooms.Add(code, gameInstance);
            Rooms.PlayersToRooms.Add(Context.ConnectionId, code);
            return code;
        }

        /// <summary>
        /// When an administrator presses start game
        /// this method tells all players that the game has started
        /// </summary>
        public Task BeginGame()
        {
            string code = Rooms.PlayersToRooms[Context.ConnectionId];
            return Clients.Groups(code).SendAsync("GameStarted");
        }

        /// <summary>
        /// When a player introduces his game code and presses start
        /// this method connects him to the correct game room
        /// </summary>
        public async void ConnectToGame(string Code, string Name, string PictureUrl)
        {
            //save the player
            Player player = new Player
            {
                Name = Name,
                PictureUrl = PictureUrl
            };
            player = await Task.Run(() => playerRepository.AddPlayer(player, Code));

            //add player to room
            Groups.AddToGroupAsync(Context.ConnectionId, Code);
            GamePlayer gamePlayer = new GamePlayer(player.Id, player.Name, player.PictureUrl);
            Rooms.Rooms[Code].Players.Add(Context.ConnectionId, gamePlayer);
            Rooms.PlayersToRooms.Add(Context.ConnectionId, Code);

            //notify GM that a new player entered
            string gameMaster = Rooms.Rooms[Code].GameMasterId;
            Clients.Client(gameMaster).SendAsync("NewPlayerHasConnected", Name, PictureUrl);
        }

        /// <summary>
        /// When the gamemaster moves to a new question
        /// he makes a request for the data for that question
        /// </summary>
        public QuestionViewModel GetCurrentQuestion()
        {
            string code = Rooms.PlayersToRooms[Context.ConnectionId];
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

        /// <summary>
        /// When the gamemaster decides to move on to the next question
        /// this method tells all players in the room to move on as well
        /// </summary>
        public void GoToNextQuestion()
        {
            string code = Rooms.PlayersToRooms[Context.ConnectionId];
            Clients.Group(code).SendAsync("NextQuestion");
            GameInstance gameInstance = Rooms.Rooms[code];
            gameInstance.CurrentQuestion++;
            gameInstance.PlayersThatAnsweredCurrentQuestion = gameInstance.Players.Count;
            Rooms.Rooms[code] = gameInstance;
        }

        /// <summary>
        /// When a player answers a question, the front end sends the answer and the time
        /// this method checks if the answer is correct (adjusting the player's score and time)
        /// and decrements the number of players that need to still answer
        /// </summary>
        public void PlayerAnsweredQuestion(int chosenAnswer, double time)
        {
            string code = Rooms.PlayersToRooms[Context.ConnectionId];
            GameInstance gameInstance = Rooms.Rooms[code];
            GamePlayer gamePlayer = gameInstance.Players[Context.ConnectionId];
            int scoreToAdd = gameInstance.QuizQuestionsAnswers.answers[gameInstance.CurrentQuestion].Item2 == chosenAnswer ? 10 : 0;
            gamePlayer.score += scoreToAdd;
            gamePlayer.time += time;
            gameInstance.Players[Context.ConnectionId] = gamePlayer;
            gameInstance.PlayersThatAnsweredCurrentQuestion--;
            Rooms.Rooms[code] = gameInstance;
        }

        /// <summary>
        /// When a player gets to the end screen he makes a request to see how he ranked
        /// </summary>
        public PlayerRankDTO GetPlayerWithRank()
        {
            string code = Rooms.PlayersToRooms[Context.ConnectionId];
            GamePlayer gamePlayer = Rooms.Rooms[code].Players[Context.ConnectionId];
            PlayerRankDTO playerRank = new PlayerRankDTO
            {
                name = gamePlayer.name,
                pictureUrl = gamePlayer.pictureUrl,
                rank = Rooms.Rooms[code].OrderedPlayers.IndexOf(gamePlayer),
                numberOfPlayers = Rooms.Rooms[code].OrderedPlayers.Count()
            };
            return playerRank;
        }

        /// <summary>
        /// When the gamemaster gets to the end screen he makes a request to get the top 3 players
        /// </summary>
        public WinnersDTO GetWinners()
        {
            string code = Rooms.PlayersToRooms[Context.ConnectionId];
            PlayerDTO[] top3Players = Rooms.Rooms[code]
                .OrderedPlayers
                .Take(3)
                .Select(dto => new PlayerDTO { name = dto.name, pictureUrl = dto.pictureUrl })
                .ToArray();
            WinnersDTO winners = new WinnersDTO(top3Players);
            return winners;
        }

        public IOrderedEnumerable<GamePlayer> OrderPlayers(IEnumerable<GamePlayer> players)
        {
            return players.OrderByDescending(p => p.score).ThenBy(p => p.time);
        }
    }
}
