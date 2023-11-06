CREATE Table Notes
(
	id INT IDENTITY(1,1) PRIMARY KEY,
	Notes nvarchar(MAX),
	users nvarchar(100)
)

INSERT into Notes(Notes, users) values('Welcome to Notes Application','Ponniah');

INSERT into Notes(Notes, users) values('It was build by using React, ASp.Net Core, SQL','Ponniah');

DELETE From Notes;

select * from Notes where ID = 5;

SELECT * FROM Notes
ORDER BY id DESC 
OFFSET 0 ROWS FETCH FIRST 1 ROW ONLY