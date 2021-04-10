using backend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JUST.DataAccess
{
    class TodoData : ITodoData
    {
        private readonly JustDataContext _context;

        public TodoData(JustDataContext context)
        {
            _context = context;
        }

        public async Task<List<Todo>> GetTodosAsync()
        {
            return await _context.Todos.ToListAsync();
        }

        public async void AddTodo(Todo newTodo)
        {
            _context.Todos.Add(newTodo);
            await _context.SaveChangesAsync();
        }
    }
}
