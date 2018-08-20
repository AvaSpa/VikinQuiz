CREATE TABLE [dbo].[PlayerGame] (
    [PlayerId]   INT NOT NULL,
    [GameId]   INT NOT NULL,
    [Score] INT NULL,
    [AverageTime] INT NULL, 
    PRIMARY KEY CLUSTERED ([PlayerId] ASC, [GameId] ASC),
    FOREIGN KEY ([GameId]) REFERENCES [dbo].[Game] ([Id]),
    FOREIGN KEY ([PlayerId]) REFERENCES [dbo].[Player] ([Id])
);

