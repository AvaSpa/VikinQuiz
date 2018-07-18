DROP Database VikingQuiz
CREATE Database VikingQuiz
Use VikingQuiz
GO
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
	Title VARCHAR(100) NOT NULL,
	PictureURL VARCHAR(max) NOT NULL,
	UserId INT REFERENCES Users(Id)
)
CREATE TABLE Questions
(
	Id INT PRIMARY KEY IDENTITY,
	Text VARCHAR(200) NOT NULL,
	CorrectAnsId INT NOT NULL
)
CREATE TABLE QuizzQuestion
(
	QuizzId INT REFERENCES Quizzes(Id),
	QuestionId INT REFERENCES Questions(Id),
	Primary Key(QuizzId, QuestionId)
)
CREATE TABLE Games
(
	Id INT Primary Key IDENTITY,
	QuizId INT REFERENCES Quizzes(Id),
	GameDate Date NOT NULL
)