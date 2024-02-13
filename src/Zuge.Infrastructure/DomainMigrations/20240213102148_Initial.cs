using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Zuge.Infrastructure.DomainMigrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Journey",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Duration = table.Column<TimeSpan>(type: "interval", nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false),
                    Train = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Journey", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Stop",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ArrivesAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    ArrivesFrom = table.Column<string>(type: "text", nullable: false),
                    DepartsAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    DepartsFrom = table.Column<string>(type: "text", nullable: false),
                    Duration = table.Column<TimeSpan>(type: "interval", nullable: false),
                    JourneyId = table.Column<int>(type: "integer", nullable: false),
                    Ordinal = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stop", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Ticket",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmailAddress = table.Column<string>(type: "text", nullable: false),
                    JourneyId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ticket", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Journey",
                columns: new[] { "Id", "Duration", "Price", "Train" },
                values: new object[,]
                {
                    { 1, new TimeSpan(0, 1, 43, 0, 0), 10m, "Juna 1" },
                    { 2, new TimeSpan(0, 1, 41, 0, 0), 10m, "Juna 1" }
                });

            migrationBuilder.InsertData(
                table: "Stop",
                columns: new[] { "Id", "ArrivesAt", "ArrivesFrom", "DepartsAt", "DepartsFrom", "Duration", "JourneyId", "Ordinal" },
                values: new object[,]
                {
                    { 1, new DateTimeOffset(new DateTime(2024, 2, 13, 5, 57, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Keuruu", new DateTimeOffset(new DateTime(2024, 2, 13, 5, 57, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Keuruu", new TimeSpan(0, 0, 0, 0, 0), 1, 1 },
                    { 2, new DateTimeOffset(new DateTime(2024, 2, 13, 6, 11, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Keuruu", new DateTimeOffset(new DateTime(2024, 2, 13, 6, 19, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Haapamäki", new TimeSpan(0, 0, 14, 0, 0), 1, 2 },
                    { 3, new DateTimeOffset(new DateTime(2024, 2, 13, 6, 28, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Haapamäki", new DateTimeOffset(new DateTime(2024, 2, 13, 6, 29, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Kolho", new TimeSpan(0, 0, 9, 0, 0), 1, 3 },
                    { 4, new DateTimeOffset(new DateTime(2024, 2, 13, 6, 38, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Kolho", new DateTimeOffset(new DateTime(2024, 2, 13, 6, 40, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Vilppula", new TimeSpan(0, 0, 9, 0, 0), 1, 4 },
                    { 5, new DateTimeOffset(new DateTime(2024, 2, 13, 6, 58, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Vilppula", new DateTimeOffset(new DateTime(2024, 2, 13, 6, 59, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Juupajoki", new TimeSpan(0, 0, 18, 0, 0), 1, 5 },
                    { 6, new DateTimeOffset(new DateTime(2024, 2, 13, 7, 9, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Juupajoki", new DateTimeOffset(new DateTime(2024, 2, 13, 7, 10, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Orivesi Keskusta", new TimeSpan(0, 0, 10, 0, 0), 1, 6 },
                    { 7, new DateTimeOffset(new DateTime(2024, 2, 13, 7, 14, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Orivesi Keskusta", new DateTimeOffset(new DateTime(2024, 2, 13, 7, 15, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Orivesi", new TimeSpan(0, 0, 4, 0, 0), 1, 7 },
                    { 8, new DateTimeOffset(new DateTime(2024, 2, 13, 7, 40, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Orivesi", new DateTimeOffset(new DateTime(2024, 2, 13, 7, 40, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Tampere", new TimeSpan(0, 0, 25, 0, 0), 1, 8 },
                    { 9, new DateTimeOffset(new DateTime(2024, 2, 13, 8, 6, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Tampere", new DateTimeOffset(new DateTime(2024, 2, 13, 8, 6, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Tampere", new TimeSpan(0, 0, 0, 0, 0), 2, 1 },
                    { 10, new DateTimeOffset(new DateTime(2024, 2, 13, 8, 31, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Tampere", new DateTimeOffset(new DateTime(2024, 2, 13, 8, 32, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Orivesi", new TimeSpan(0, 0, 25, 0, 0), 2, 2 },
                    { 11, new DateTimeOffset(new DateTime(2024, 2, 13, 8, 35, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Orivesi", new DateTimeOffset(new DateTime(2024, 2, 13, 8, 36, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Orivesi Keskusta", new TimeSpan(0, 0, 3, 0, 0), 2, 3 },
                    { 12, new DateTimeOffset(new DateTime(2024, 2, 13, 8, 46, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Orivesi Keskusta", new DateTimeOffset(new DateTime(2024, 2, 13, 8, 47, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Juupajoki", new TimeSpan(0, 0, 10, 0, 0), 2, 4 },
                    { 13, new DateTimeOffset(new DateTime(2024, 2, 13, 9, 6, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Juupajoki", new DateTimeOffset(new DateTime(2024, 2, 13, 9, 7, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Vilppula", new TimeSpan(0, 0, 19, 0, 0), 2, 5 },
                    { 14, new DateTimeOffset(new DateTime(2024, 2, 13, 9, 14, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Vilppula", new DateTimeOffset(new DateTime(2024, 2, 13, 9, 15, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Kolho", new TimeSpan(0, 0, 7, 0, 0), 2, 6 },
                    { 15, new DateTimeOffset(new DateTime(2024, 2, 13, 9, 25, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Kolho", new DateTimeOffset(new DateTime(2024, 2, 13, 9, 33, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Haapamäki", new TimeSpan(0, 0, 10, 0, 0), 2, 7 },
                    { 16, new DateTimeOffset(new DateTime(2024, 2, 13, 9, 47, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Kolho", new DateTimeOffset(new DateTime(2024, 2, 13, 9, 47, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Keuruu", new TimeSpan(0, 0, 14, 0, 0), 2, 8 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Journey");

            migrationBuilder.DropTable(
                name: "Stop");

            migrationBuilder.DropTable(
                name: "Ticket");
        }
    }
}
