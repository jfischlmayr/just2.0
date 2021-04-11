using JUST.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace JUST.Data
{
    public interface IJustDataContext
    {
        DbSet<Address> Addresses { get; set; }
        DbSet<Project> Projects { get; set; }
        DbSet<JustTask> Todos { get; set; }
    }
}