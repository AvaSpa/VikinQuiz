IF db_id('VikinQuiz') is not null
	DROP Database VikinQuiz
CREATE Database VikinQuiz
Use VikinQuiz

CREATE TABLE Users(
	Id int PRIMARY KEY IDENTITY,
	Username nvarchar(100),
	Email nvarchar(100),
	Pass nvarchar(100),
	PictureURL nvarchar(max)
);
CREATE TABLE Quizzes
(
	Id INT PRIMARY KEY IDENTITY,
	Title nvarchar(100) NOT NULL,
	PictureURL varchar(max) NOT NULL,
	UserId INT REFERENCES Users(Id)
);
CREATE TABLE Questions
(
	Id INT PRIMARY KEY IDENTITY,
	Text nvarchar(200) NOT NULL,
	CorrectAnsId INT NOT NULL
);
CREATE TABLE QuizzQuestion
(
	QuizzId INT REFERENCES Quizzes(Id),
	QuestionId INT REFERENCES Questions(Id),
	Primary Key(QuizzId, QuestionId)
);
CREATE TABLE Games
(
	Id INT Primary Key IDENTITY,
	QuizId INT REFERENCES Quizzes(Id),
	GameDate Date NOT NULL
);

CREATE TABLE Players(
	Id int PRIMARY KEY IDENTITY,
	PictureURL varchar(max) NOT NULL,
	Name nvarchar(50)
);

CREATE TABLE PlayerGame(
	Pid int REFERENCES Players(Id),
	Gid int REFERENCES Games(Id),
	Score int,
	PRIMARY KEY (Pid, Gid)
);

CREATE TABLE Sesions(
	Id int PRIMARY KEY IDENTITY,
	UserId int REFERENCES Users(Id),
	Token varchar(max),
	ExpTime int
);

CREATE TABLE Answers (
	ID int PRIMARY KEY IDENTITY,
	Text nvarchar(250),
	QuestionID int FOREIGN KEY REFERENCES Questions(ID)
);