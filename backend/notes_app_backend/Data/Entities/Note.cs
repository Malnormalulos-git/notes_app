using System.ComponentModel.DataAnnotations;
using notes_app_backend.Data.Entities.Base;

namespace notes_app_backend.Data;

public class Note : Entity
{
    public string OwnerId { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string Content { get; set; }
}