﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JUST.Data.Models
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
            return await _context.Todos.ToListAsync();
        }

        public async Task AddTask(JustTask newTask)
        {
            _context.Todos.Add(newTask);
            await _context.SaveChangesAsync();
        }
    }
}