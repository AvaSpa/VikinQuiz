CREATE TABLE [dbo].[Game] (
    [Id]       INT  IDENTITY (1, 1) NOT NULL,
    [QuizId]   INT  NULL,
    [GameDate] DATE NOT NULL,
    [Code] NVARCHAR(MAX) NULL, 
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([QuizId]) REFERENCES [dbo].[Quiz] ([Id])
);

