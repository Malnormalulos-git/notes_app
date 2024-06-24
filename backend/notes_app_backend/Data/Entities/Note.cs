using System.ComponentModel.DataAnnotations;

namespace notes_app_backend.Data;

public class Note
{
    [Key] public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Body { get; set; } = null!;
}