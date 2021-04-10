using backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace JUST.DataAccess
{
    public interface ITasksData
    {
        void AddTodo(JustTask newTask);
        Task<List<JustTask>> GetTodosAsync();
    }
}