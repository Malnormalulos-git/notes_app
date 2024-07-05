namespace notes_app_backend.Data.Entities.Base;

public interface IEntity
{
    public DateTime CreatedAt { get; set; }
    public DateTime LastUpdatedAt { get; set; }
}