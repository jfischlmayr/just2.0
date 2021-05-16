using JUST.Data.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
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

        public async Task DeleteTask(int id)
        {
            _context.Tasks.Remove(_context.Tasks.Find(id));
            await _context.SaveChangesAsync();
        }

        public async Task CompleteTask(int id)
        {
            var task = _context.Tasks.Find(id);
            task.Done = !task.Done;
            await _context.SaveChangesAsync();
        }

        public async Task EditTask(JustTask task)
        {
            _context.Tasks.Update(task);
            await _context.SaveChangesAsync();
        }
    }
}
