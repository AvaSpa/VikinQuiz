Use VikinQuiz;

DELETE FROM PlayerGame
DELETE FROM Games
DELETE FROM Players
DELETE FROM Quizzes
DELETE FROM Users

DBCC CHECKIDENT ('Games', RESEED, 0);
GO
DBCC CHECKIDENT ('Players', RESEED, 0);
GO
DBCC CHECKIDENT ('Quizzes', RESEED, 0);
GO
DBCC CHECKIDENT ('Users', RESEED, 0);
GO

INSERT INTO Users VALUES ('andi', 'andiabrudan@yahoo.com', '1234', 'https://andi.com/profile.jpg');
INSERT INTO Users VALUES ('bob', 'dillabn@google.com', '1234', 'https://bob.com/profile.jpg');
INSERT INTO Users VALUES ('marian', 'marian@yahoo.com', '0000', 'https://marian.com/profile.jpg');

INSERT INTO Quizzes VALUES ('Sql quiz', 'https://marian.com/sqlquiz.jpg', 1);
INSERT INTO Quizzes VALUES ('Who wants to be a milionaire', 'https://million.com/million.jpg', 2);
INSERT INTO Quizzes VALUES ('Viking Quiz', 'https://vikings.com/picture.jpg', 2);
INSERT INTO Quizzes VALUES ('Do you know your dog', 'https://dogs.com/puppy.jpg', 3);

INSERT INTO Players(PictureURL, Name) VALUES ('url1', 'batman'),
('url2', 'superman'), ('url3', 'flash'), ('url4', 'wonderwoman'), ('url5', 'catwoman')

INSERT INTO Games(QuizId, GameDate) VALUES (1, '2018-07-07'), (2, '2018-07-10'), (3, '2018-07-11')

INSERT INTO PlayerGame(Pid, Gid, Score) VALUES (1,1,5), (1,2,7), (2,1,3), (3,1,0), (4,1,10)

SELECT * FROM Quizzes;
SELECT * FROM Users;
SELECT * FROM Games;
SELECT * FROM Players;
SELECT * FROM PlayerGame;