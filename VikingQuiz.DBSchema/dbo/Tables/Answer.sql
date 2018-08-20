CREATE TABLE [dbo].[Answer] (
    [ID]           INT            IDENTITY (1, 1) NOT NULL,
    [Text]         NVARCHAR (250) NULL,
    [QuestionID]   INT            NULL,
    [LastModified] DATE           NULL,
    PRIMARY KEY CLUSTERED ([ID] ASC),
    FOREIGN KEY ([QuestionID]) REFERENCES [dbo].[Question] ([Id])
);

