CREATE TABLE [dbo].[Quiz] (
    [Id]           INT            IDENTITY (1, 1) NOT NULL,
    [Title]        NVARCHAR (100) NOT NULL,
    [PictureURL]   VARCHAR (MAX)  NOT NULL,
    [UserId]       INT            NULL,
    [LastModified] DATE           NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([UserId]) REFERENCES [dbo].[User] ([Id])
);

