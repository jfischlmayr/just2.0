﻿using JUST.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace JUST.Data
{
    public interface ITasksData
    {
        Task AddTask(JustTask newTask);
        Task<List<JustTask>> GetTasks();
    }
}