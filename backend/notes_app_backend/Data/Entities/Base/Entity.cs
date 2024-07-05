using System.ComponentModel.DataAnnotations;

namespace notes_app_backend.Data.Entities.Base;

public class Entity : IEntity
{
    [Key] public long Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime LastUpdatedAt { get; set; }
}