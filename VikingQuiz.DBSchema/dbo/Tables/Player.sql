CREATE TABLE [dbo].[Player] (
    [Id]         INT           IDENTITY (1, 1) NOT NULL,
    [PictureURL] VARCHAR (MAX) NOT NULL,
    [Name]       NVARCHAR (50) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

