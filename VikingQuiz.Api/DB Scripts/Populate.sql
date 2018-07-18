Use VikinQuiz;

INSERT INTO Users VALUES ('andi', 'andiabrudan@yahoo.com', '1234', 'https://andi.com/profile.jpg');
INSERT INTO Users VALUES ('bob', 'dillabn@google.com', '1234', 'https://bob.com/profile.jpg');
INSERT INTO Users VALUES ('marian', 'marian@yahoo.com', '0000', 'https://marian.com/profile.jpg');

INSERT INTO Quizzes VALUES ('Sql quiz', 'https://marian.com/sqlquiz.jpg', 1);
INSERT INTO Quizzes VALUES ('Who wants to be a milionaire', 'https://million.com/million.jpg', 2);
INSERT INTO Quizzes VALUES ('Viking Quiz', 'https://vikings.com/picture.jpg', 2);
INSERT INTO Quizzes VALUES ('Do you know your dog', 'https://dogs.com/puppy.jpg', 3);

SELECT * FROM Quizzes;