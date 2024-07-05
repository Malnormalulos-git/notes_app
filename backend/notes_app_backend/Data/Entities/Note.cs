using System.ComponentModel.DataAnnotations;
using notes_app_backend.Data.Entities.Base;

namespace notes_app_backend.Data;

public class Note : Entity
{
    // [Key] public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Body { get; set; } = null!;
}