namespace notes_app_backend.DTOs;

public record UpdateNoteDto
{
    int Id { get; set; };
    string Title { get; set; } = null!;
    string Body { get; set; } = null!;
}