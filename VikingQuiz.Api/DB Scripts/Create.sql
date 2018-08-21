IF db_id('VikinQuiz') is not null
	DROP Database VikinQuiz
CREATE Database VikinQuiz
GO
Use VikinQuiz

CREATE TABLE [User](
	Id int PRIMARY KEY IDENTITY,
	Username nvarchar(100),
	Email nvarchar(100) UNIQUE,
	Pass nvarchar(100),
	PictureURL nvarchar(max),
	Token varchar(100),
	IsConfirmed bit NOT NULL,
	LastModified date
);
CREATE TABLE Quiz
(
	Id INT PRIMARY KEY IDENTITY,
	Title nvarchar(100) NOT NULL,
	PictureURL varchar(max) NOT NULL,
	UserId INT REFERENCES [User](Id),
	LastModified date
);
CREATE TABLE Question
(
	Id INT PRIMARY KEY IDENTITY,
	Text nvarchar(200) NOT NULL,
	CorrectAnsId INT NOT NULL,
	LastModified date
);
CREATE TABLE QuizQuestion(
	QuizId INT REFERENCES Quiz(Id),
	QuestionId INT REFERENCES Question(Id),
	Primary Key(QuizId, QuestionId)
);
CREATE TABLE Game(
	Id INT Primary Key IDENTITY,
	QuizId INT REFERENCES Quiz(Id),
	GameDate Date NOT NULL,
	Code varchar(max) NOT NULL
);

CREATE TABLE Player(
	Id int PRIMARY KEY IDENTITY,
	PictureURL varchar(max) NOT NULL,
	Name nvarchar(50)
);

CREATE TABLE PlayerGame(
	PlayerId int REFERENCES Player(Id),
	GameId int REFERENCES Game(Id),
	Score int,
	AverageTime int,
	PRIMARY KEY (PlayerId, GameId)
);

CREATE TABLE Answer(
	ID int PRIMARY KEY IDENTITY,
	Text nvarchar(250),
	QuestionID int FOREIGN KEY REFERENCES Question(ID),
	LastModified date
);