using Microsoft.EntityFrameworkCore;

namespace JUST.DataAccess
{
    public class JustDataContext : DbContext, IJustDataContext
    {
        public JustDataContext(DbContextOptions<JustDataContext> options)
        : base(options)
        { }

        public DbSet<JustTask> Todos { get; set; }

    }
}

