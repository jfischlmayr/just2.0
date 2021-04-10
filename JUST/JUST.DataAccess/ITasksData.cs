using System.Collections.Generic;
using System.Threading.Tasks;

namespace JUST.DataAccess
{
    public interface ITasksData
    {
        Task AddTask(JustTask newTask);
        Task<List<JustTask>> GetTasks();
    }
}