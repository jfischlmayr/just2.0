using System.Collections.Generic;
using System.Threading.Tasks;

namespace JUST.Data.Models
{
    public interface IProjectData
    {
        Task AddProject(Project newProject);
        Task<List<Project>> GetProjects();
        Task InitProjects();
    }
}