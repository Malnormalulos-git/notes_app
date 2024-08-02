using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace notes_app_backend.Migrations
{
    /// <inheritdoc />
    public partial class NoteBody_renamed_to_Content_and_made_it_nullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Body",
                table: "Notes",
                newName: "Content");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_Email",
                table: "AspNetUsers",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_Email",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "Content",
                table: "Notes",
                newName: "Body");
        }
    }
}
