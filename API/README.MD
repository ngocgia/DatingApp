dotnet ef database drop
dotnet ef migrations add IniticalCreate -o Data/Migrations
dotnet ef database update
