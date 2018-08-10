using Microsoft.EntityFrameworkCore.Migrations;

namespace VikingQuiz.Api.Migrations
{
    public partial class AddCode_To_Game : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "Game",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Code",
                table: "Game");
        }
    }
}
