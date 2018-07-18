CREATE TABLE Users(
	Id int PRIMARY KEY IDENTITY,
	Username nvarchar(100),
	Email nvarchar(100),
	Pass nvarchar(100),
	PictureURL nvarchar(max)
);