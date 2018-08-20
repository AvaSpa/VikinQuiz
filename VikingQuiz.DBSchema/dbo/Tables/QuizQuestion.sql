CREATE TABLE [dbo].[QuizQuestion] (
    [QuizId]     INT NOT NULL,
    [QuestionId] INT NOT NULL,
    PRIMARY KEY CLUSTERED ([QuizId] ASC, [QuestionId] ASC),
    FOREIGN KEY ([QuestionId]) REFERENCES [dbo].[Question] ([Id]),
    FOREIGN KEY ([QuizId]) REFERENCES [dbo].[Quiz] ([Id])
);

