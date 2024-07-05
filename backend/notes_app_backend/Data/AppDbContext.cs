using Microsoft.EntityFrameworkCore;
using notes_app_backend.Data.Entities.Base;

namespace notes_app_backend.Data
{
    public class AppDbContext : DbContext
    {
        private readonly IConfiguration _configuration;
        private readonly TimeProvider _timeProvider;
        public AppDbContext(IConfiguration configuration, TimeProvider timeProvider)
        {
            _configuration = configuration;
            _timeProvider = timeProvider;
        }
        
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseNpgsql(_configuration.GetConnectionString("WebApiDatabase"));
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess,
            CancellationToken cancellationToken = default)
        {
            OnBeforeSaving();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }
        public DbSet<Note> Notes { get; set; }
        private void OnBeforeSaving()
        {
            var entries = ChangeTracker.Entries();
        
            foreach (var entry in entries)
                if (entry.Entity is IEntity entity)
                {
                    var now = _timeProvider.GetUtcNow().UtcDateTime;
                    switch (entry.State)
                    {
                        case EntityState.Modified:
                            entity.LastUpdatedAt = now;
                            break;
                        case EntityState.Added:
                            entity.CreatedAt = now;
                            entity.LastUpdatedAt = now;
                            break;
                    }
                }
        }
    }
}