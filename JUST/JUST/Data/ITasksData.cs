using System.Collections.Generic;
using System.Threading.Tasks;

namespace JUST.Data.Models
{
    public interface ITasksData
    {
        Task AddTask(JustTask newTask);
        Task<List<JustTask>> GetTasks();
    }
}