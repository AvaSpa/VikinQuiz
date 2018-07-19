IF db_id('VikinQuiz') is not null
	DROP Database VikinQuiz
CREATE Database VikinQuiz
GO
Use VikinQuiz

CREATE TABLE [User](
	Id int PRIMARY KEY IDENTITY,
	Username nvarchar(100),
	Email nvarchar(100),
	Pass nvarchar(100),
	PictureURL nvarchar(max),
	Token nvarchar(100),
	IsConfirmed bit
);
CREATE TABLE Quiz
(
	Id INT PRIMARY KEY IDENTITY,
	Title nvarchar(100) NOT NULL,
	PictureURL varchar(max) NOT NULL,
	UserId INT REFERENCES [User](Id)
);
CREATE TABLE Question
(
	Id INT PRIMARY KEY IDENTITY,
	Text nvarchar(200) NOT NULL,
	CorrectAnsId INT NOT NULL
);
CREATE TABLE QuizQuestion(
	QuizzId INT REFERENCES Quiz(Id),
	QuestionId INT REFERENCES Question(Id),
	Primary Key(QuizzId, QuestionId)
);
CREATE TABLE Game(
	Id INT Primary Key IDENTITY,
	QuizId INT REFERENCES Quiz(Id),
	GameDate Date NOT NULL
);

CREATE TABLE Player(
	Id int PRIMARY KEY IDENTITY,
	PictureURL varchar(max) NOT NULL,
	Name nvarchar(50)
);

CREATE TABLE PlayerGame(
	Pid int REFERENCES Player(Id),
	Gid int REFERENCES Game(Id),
	Score int,
	PRIMARY KEY (Pid, Gid)
);

CREATE TABLE Sesion(
	Id int PRIMARY KEY IDENTITY,
	UserId int REFERENCES [User](Id),
	Token varchar(max),
	ExpTime int
);

CREATE TABLE Answer(
	ID int PRIMARY KEY IDENTITY,
	Text nvarchar(250),
	QuestionID int FOREIGN KEY REFERENCES Question(ID)
);