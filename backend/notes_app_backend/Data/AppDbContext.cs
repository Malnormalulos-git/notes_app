using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using notes_app_backend.Data.Entities.Base;

namespace notes_app_backend.Data
{
    public class AppDbContext : IdentityDbContext<AppUser>
    {
        private readonly TimeProvider _timeProvider;
        public AppDbContext(DbContextOptions options, TimeProvider timeProvider) : base(options)
        {
            _timeProvider = timeProvider;
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<AppUser>()
                .HasIndex(b => b.Email)
                .IsUnique();
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