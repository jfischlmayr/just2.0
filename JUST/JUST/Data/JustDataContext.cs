using JUST.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace JUST.Data
{
    public class JustDataContext : DbContext, IJustDataContext
    {
        public JustDataContext(DbContextOptions<JustDataContext> options)
        : base(options)
        { }

        public DbSet<JustTask> Tasks { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Address> Addresses { get; set; }
    }
}

