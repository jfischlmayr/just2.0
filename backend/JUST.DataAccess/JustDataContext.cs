using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class JustDataContext : DbContext, IJustDataContext
    {
        public JustDataContext(DbContextOptions<JustDataContext> options)
        : base(options)
        { }

        public DbSet<Todo> Todos { get; set; }

    }
}
