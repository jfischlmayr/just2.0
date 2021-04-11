using JUST.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JUST.Data
{
    public class TaskData : ITasksData
    {
        private readonly JustDataContext _context;

        public TaskData(JustDataContext context)
        {
            _context = context;
        }

        public async Task<List<JustTask>> GetTasks()
        {
            return await _context.Tasks.ToListAsync();
        }

        public async Task AddTask(JustTask newTask)
        {
            _context.Tasks.Add(newTask);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {

            _context.Tasks.Remove(_context.Tasks.Find(id));
            await _context.SaveChangesAsync();
        }
    }
}
