using Microsoft.EntityFrameworkCore;

namespace JUST.Data.Models
{
    public class JustDataContext : DbContext, IJustDataContext
    {
        public JustDataContext(DbContextOptions<JustDataContext> options)
        : base(options)
        { }

        public DbSet<JustTask> Todos { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Address> Addresses { get; set; }
    }
}

