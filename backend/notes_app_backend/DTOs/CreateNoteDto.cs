namespace notes_app_backend.DTOs;

public record CreateNoteDto
{
    string Title { get; set; } = null!;
    string Body { get; set; } = null!;
}