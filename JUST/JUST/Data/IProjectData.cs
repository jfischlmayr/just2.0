using JUST.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace JUST.Data
{
    public interface IProjectData
    {
        Task AddProject(Project newProject);
        Task<List<Project>> GetProjects();
        Task InitProjects();
        Task DeleteProject(int id);
    }
}