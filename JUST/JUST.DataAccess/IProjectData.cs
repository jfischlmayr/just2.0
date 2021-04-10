using JUST.DataAccess.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace JUST.DataAccess
{
    public interface IProjectData
    {
        Task AddProject(Project newProject);
        Task<List<Project>> GetProjects();
        Task InitProjects();
    }
}