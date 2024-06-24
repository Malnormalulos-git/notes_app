using Microsoft.EntityFrameworkCore;

namespace notes_app_backend.Data
{
    public class AppDbContext : DbContext
    {
        private readonly IConfiguration Configuration;

        public AppDbContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        
        // public NotesAppDbContext(DbContextOptions<NotesAppDbContext> options)
        //     : base(options) { }
        
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseNpgsql(Configuration.GetConnectionString("WebApiDatabase"));
        }

        public DbSet<Note> Notes { get; set; }
    }
}