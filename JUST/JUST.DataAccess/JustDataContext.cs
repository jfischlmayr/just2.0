using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class JustDataContext : DbContext
    {
        public JustDataContext(DbContextOptions<JustDataContext> options)
        : base(options)
        { }

        public DbSet<JustTask> Todos { get; set; }

    }
}

