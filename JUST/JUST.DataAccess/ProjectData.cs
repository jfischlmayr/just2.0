using JUST.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JUST.DataAccess
{
    public class ProjectData : IProjectData
    {
        private readonly JustDataContext _context;

        public ProjectData(JustDataContext context)
        {
            _context = context;
        }

        public async Task InitProjects()
        {
            Project fling = new();
            Address address = new();

            address.Street = "Stadlerstraße";
            address.HouseNumber = "17";
            address.City = "Linz";
            address.ZIPCode = 4020;

            fling.Title = "Fling";

            await _context.AddAsync(fling);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Project>> GetProjects()
        {
            return await _context.Projects.ToListAsync();
        }

        public async Task AddProject(Project newProject)
        {
            await _context.Projects.AddAsync(newProject);
            await _context.SaveChangesAsync();
        }
    }
}
