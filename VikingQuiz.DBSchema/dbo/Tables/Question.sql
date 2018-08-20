CREATE TABLE [dbo].[Question] (
    [Id]           INT            IDENTITY (1, 1) NOT NULL,
    [Text]         NVARCHAR (200) NOT NULL,
    [CorrectAnsId] INT            NOT NULL,
    [LastModified] DATE           NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

