using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class report : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Report_AspNetUsers_AppUserId",
                table: "Report");

            migrationBuilder.DropForeignKey(
                name: "FK_Report_ReportedUser_ReportedUsersId",
                table: "Report");

            migrationBuilder.DropForeignKey(
                name: "FK_ReportedUser_AspNetUsers_AppUserId",
                table: "ReportedUser");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ReportedUser",
                table: "ReportedUser");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Report",
                table: "Report");

            migrationBuilder.RenameTable(
                name: "ReportedUser",
                newName: "ReportedUsers");

            migrationBuilder.RenameTable(
                name: "Report",
                newName: "Reports");

            migrationBuilder.RenameIndex(
                name: "IX_ReportedUser_AppUserId",
                table: "ReportedUsers",
                newName: "IX_ReportedUsers_AppUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Report_ReportedUsersId",
                table: "Reports",
                newName: "IX_Reports_ReportedUsersId");

            migrationBuilder.RenameIndex(
                name: "IX_Report_AppUserId",
                table: "Reports",
                newName: "IX_Reports_AppUserId");

            migrationBuilder.AlterColumn<int>(
                name: "ReportedUsersId",
                table: "Reports",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ReportedUsers",
                table: "ReportedUsers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Reports",
                table: "Reports",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ReportedUsers_AspNetUsers_AppUserId",
                table: "ReportedUsers",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_AspNetUsers_AppUserId",
                table: "Reports",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_ReportedUsers_ReportedUsersId",
                table: "Reports",
                column: "ReportedUsersId",
                principalTable: "ReportedUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReportedUsers_AspNetUsers_AppUserId",
                table: "ReportedUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Reports_AspNetUsers_AppUserId",
                table: "Reports");

            migrationBuilder.DropForeignKey(
                name: "FK_Reports_ReportedUsers_ReportedUsersId",
                table: "Reports");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Reports",
                table: "Reports");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ReportedUsers",
                table: "ReportedUsers");

            migrationBuilder.RenameTable(
                name: "Reports",
                newName: "Report");

            migrationBuilder.RenameTable(
                name: "ReportedUsers",
                newName: "ReportedUser");

            migrationBuilder.RenameIndex(
                name: "IX_Reports_ReportedUsersId",
                table: "Report",
                newName: "IX_Report_ReportedUsersId");

            migrationBuilder.RenameIndex(
                name: "IX_Reports_AppUserId",
                table: "Report",
                newName: "IX_Report_AppUserId");

            migrationBuilder.RenameIndex(
                name: "IX_ReportedUsers_AppUserId",
                table: "ReportedUser",
                newName: "IX_ReportedUser_AppUserId");

            migrationBuilder.AlterColumn<int>(
                name: "ReportedUsersId",
                table: "Report",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Report",
                table: "Report",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ReportedUser",
                table: "ReportedUser",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Report_AspNetUsers_AppUserId",
                table: "Report",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Report_ReportedUser_ReportedUsersId",
                table: "Report",
                column: "ReportedUsersId",
                principalTable: "ReportedUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ReportedUser_AspNetUsers_AppUserId",
                table: "ReportedUser",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
