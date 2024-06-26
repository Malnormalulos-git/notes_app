namespace notes_app_backend.DTOs;

public record EditNoteDto
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Body { get; set; } = null!;
}