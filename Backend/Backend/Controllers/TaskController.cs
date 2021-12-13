using JUST.Data;
using JUST.Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly JustDataContext context;

        public TaskController(JustDataContext ctx)
        {
            context = ctx;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTasks()
        {
            return Ok(await context.Tasks.ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> PostTask([FromBody] JustTask task)
        {
            if (task == null) return BadRequest("Task was empty");

            context.Tasks.Add(task);

            var project = await context.Projects.FirstOrDefaultAsync(p => p.Id == task.ProjectId);
            project.Tasks.Add(task);

            await context.SaveChangesAsync();

            return Created(string.Empty, task);
        }
    }
}
