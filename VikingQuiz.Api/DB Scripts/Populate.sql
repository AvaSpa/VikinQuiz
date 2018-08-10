Use VikinQuiz;

DELETE FROM PlayerGame
DELETE FROM Game
DELETE FROM Player
DELETE FROM QuizQuestion
DELETE FROM Answer
DELETE FROM Question
DELETE FROM Quiz
DELETE FROM [User]


DBCC CHECKIDENT ('Game', RESEED,	1);
GO
DBCC CHECKIDENT ('Player', RESEED,	1);
GO
DBCC CHECKIDENT ('Answer', RESEED,	1);
GO
DBCC CHECKIDENT ('Question', RESEED,1);
GO
DBCC CHECKIDENT ('Quiz', RESEED,	1);
GO
DBCC CHECKIDENT ('User', RESEED,	1);
GO

INSERT INTO [User](Username, Email, Pass, PictureURL, LastModified, IsConfirmed) VALUES ('andi', 'andiabrudan@yahoo.com', '1234', 'https://andi.com/profile.jpg', '2000-01-01', 1);
INSERT INTO [User](Username, Email, Pass, PictureURL, LastModified, IsConfirmed) VALUES ('bob', 'dillabn@google.com', '1234', 'https://bob.com/profile.jpg', '2000-01-01', 1);
INSERT INTO [User](Username, Email, Pass, PictureURL, LastModified, IsConfirmed) VALUES ('marian', 'marian@yahoo.com', '0000', 'https://marian.com/profile.jpg', '2000-01-01', 1);

INSERT INTO Quiz VALUES ('Sql quiz', 'https://marian.com/sqlquiz.jpg', 1, '2000-01-01');
INSERT INTO Quiz VALUES ('Who wants to be a milionaire', 'https://million.com/million.jpg', 2, '2000-01-01');
INSERT INTO Quiz VALUES ('Viking Quiz', 'https://vikings.com/picture.jpg', 2, '2000-01-01');
INSERT INTO Quiz VALUES ('Do you know your dog', 'https://dogs.com/puppy.jpg', 3, '2000-01-01');

INSERT INTO Question VALUES ('What is the sintax to create a table', 1, '2000-01-01');
INSERT INTO Question VALUES ('What is the sintax to remove a table', 6, '2000-01-01');
INSERT INTO Question VALUES ('What is the sintax to modify a table', 10, '2000-01-01');
INSERT INTO Question VALUES ('What is the sintax to add new records into a table', 16, '2000-01-01');

INSERT INTO Answer VALUES ('CREATE TABLE', 1, '2000-01-01');
INSERT INTO Answer VALUES ('ALTER TABLE' , 1, '2000-01-01');
INSERT INTO Answer VALUES ('DELETE TABLE', 1, '2000-01-01');
INSERT INTO Answer VALUES ('UPDATE TABLE', 1, '2000-01-01');

INSERT INTO Answer VALUES ('UPDATE TABLE', 2, '2000-01-01');
INSERT INTO Answer VALUES ('DELETE TABLE', 2, '2000-01-01');
INSERT INTO Answer VALUES ('ALTER TABLE' , 2, '2000-01-01');
INSERT INTO Answer VALUES ('CREATE TABLE', 2, '2000-01-01');

INSERT INTO Answer VALUES ('UPDATE TABLE', 3, '2000-01-01');
INSERT INTO Answer VALUES ('ALTER TABLE' , 3, '2000-01-01');
INSERT INTO Answer VALUES ('CREATE TABLE', 3, '2000-01-01');
INSERT INTO Answer VALUES ('DELETE TABLE', 3, '2000-01-01');

INSERT INTO Answer VALUES ('CREATE TABLE', 4, '2000-01-01');
INSERT INTO Answer VALUES ('DELETE TABLE', 4, '2000-01-01');
INSERT INTO Answer VALUES ('ALTER TABLE' , 4, '2000-01-01');
INSERT INTO Answer VALUES ('INSERT INTO' , 4, '2000-01-01');


INSERT INTO QuizQuestion VALUES (1,1);
INSERT INTO QuizQuestion VALUES (1,2);
INSERT INTO QuizQuestion VALUES (1,3);
INSERT INTO QuizQuestion VALUES (1,4);



INSERT INTO Player(PictureURL, Name) VALUES ('url1', 'batman'),
('url2', 'superman'), ('url3', 'flash'), ('url4', 'wonderwoman'), ('url5', 'catwoman'),
('url6', 'joker'),
('url7', 'thor'), ('url8', 'spiderman'), ('url9', 'loki'), ('url10', 'groot')

INSERT INTO Game(QuizId, GameDate, Code) VALUES (1, '2018-07-07', 'AAAAAA'), (2, '2018-07-10', '123456'), (3, '2018-07-11', 'qwerty')

INSERT INTO PlayerGame(Pid, Gid, Score) VALUES (1,1,5), (1,2,7), (2,1,3), (3,1,0), (4,1,10)

SELECT * FROM Quiz;
SELECT * FROM [User];
SELECT * FROM Game;
SELECT * FROM Player;
SELECT * FROM PlayerGame;
SELECT * FROM Answer