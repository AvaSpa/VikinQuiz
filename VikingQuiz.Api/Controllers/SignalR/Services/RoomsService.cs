using System;
using System.Collections.Generic;
using System.Linq;
using VikingQuiz.Api.Repositories;

namespace VikingQuiz.Api.Controllers.SignalR.Services
{
    public struct GamePlayer
    {
        public int id;
        public string name;
        public string pictureUrl;
        public int score;
        public double time;

        public GamePlayer(int id, string name, string pictureUrl)
        {
            this.id = id;
            this.name = name;
            this.pictureUrl = pictureUrl;
            this.score = 0;
            this.time = 0;
        }
    }

    public struct GameInstance
    {
        public QuizQuestionsAnswers QuizQuestionsAnswers;
        //key - connectionId of player
        public IDictionary<string, GamePlayer> Players;
        public IOrderedEnumerable<GamePlayer> OrderedPlayers;

        public int CurrentQuestion
        {
            get { return _question; }
            set
            {
                _question = value;
                if (_question == QuizQuestionsAnswers.questions.Count)
                {
                    NoMoreQuestionsCallback(this);
                }
            }
        }
        public int PlayersThatAnsweredCurrentQuestion
        {
            get { return _players; }
            set
            {
                _players = value;
                if (_players == 0)
                {
                    AllPlayersAnsweredCallback(this);
                }
            }
        }
        public string GameMasterId;
        private int _players;
        private int _question;
        private Action<GameInstance> AllPlayersAnsweredCallback;
        private Action<GameInstance> NoMoreQuestionsCallback;

        public GameInstance(QuizQuestionsAnswers QuizQuestionsAnswers, string GameMasterId, Action<GameInstance> AllPlayersAnsweredCallback, Action<GameInstance> NoMoreQuestionsCallback)
        {
            this.QuizQuestionsAnswers = QuizQuestionsAnswers;
            this.GameMasterId = GameMasterId;
            this.AllPlayersAnsweredCallback = AllPlayersAnsweredCallback;
            this.NoMoreQuestionsCallback = NoMoreQuestionsCallback;
            this.Players = new Dictionary<string, GamePlayer>();
            this._question = 0;
            this._players = 0;
            this.OrderedPlayers = null;
        }
    }

    public interface IRoomService {
        //key - code of the game
        IDictionary<string, GameInstance> Rooms { get; set; }
        //key - connection id, value - code of the game
        IDictionary<string, string> PlayersToRooms { get; set; }
    }
    public class RoomsService : IRoomService
    {
        public IDictionary<string, GameInstance> Rooms { get; set; }
        public IDictionary<string, string> PlayersToRooms { get; set; }

        public RoomsService()
        {
            this.Rooms = new Dictionary<string, GameInstance>();
            this.PlayersToRooms = new Dictionary<string, string>();
        }
    }
}
