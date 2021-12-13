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

        [HttpDelete]
        public async Task<IActionResult> DeleteTask([FromQuery] int id)
        {
            var task = await context.Tasks.FirstOrDefaultAsync(t => t.Id == id);
            if (task == null) return BadRequest("Task doesn't exist!");

            var project = await context.Projects.FirstOrDefaultAsync(p => p.Id == task.ProjectId);
            if (project == null) return BadRequest("Project doesn't exist!");

            project.Tasks.Remove(task);
            context.Tasks.Remove(task);

            await context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut]
        public async Task<IActionResult> EditTask([FromBody] JustTask task)
        {
            var result = await context.Tasks.FirstOrDefaultAsync(p => p.Id == task.Id);
            if (result == null)
                return BadRequest();

            result.Title = task.Title;
            result.StartDate = task.StartDate;
            result.EndDate = task.EndDate;
            result.ProjectId = task.ProjectId;

            await context.SaveChangesAsync();

            return Ok(await context.Tasks.FirstOrDefaultAsync(p => p.Id == task.Id));
        }
    }
}
