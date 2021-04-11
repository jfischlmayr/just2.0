using JUST.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JUST.Data
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
            await _context.AddAsync(address);

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
            await _context.AddAsync(newProject);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteProject(int id)
        {
            _context.Projects.Remove(_context.Projects.Find(id));
            await _context.SaveChangesAsync();
        }
    }
}
