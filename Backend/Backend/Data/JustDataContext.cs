using JUST.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace JUST.Data
{
    public class JustDataContext : DbContext
    {
        public JustDataContext(DbContextOptions<JustDataContext> options)
        : base(options)
        { }

        public DbSet<JustTask> Tasks { get; set; }
    }
}

