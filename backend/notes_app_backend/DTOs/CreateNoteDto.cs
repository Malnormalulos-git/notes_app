namespace notes_app_backend.DTOs;

public record CreateNoteDto
{
    public string Title { get; set; } = null!;
    public string Body { get; set; } = null!;
}