using backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace JUST.DataAccess
{
    interface ITodoData
    {
        void AddTodo(Todo newTodo);
        Task<List<Todo>> GetTodosAsync();
    }
}