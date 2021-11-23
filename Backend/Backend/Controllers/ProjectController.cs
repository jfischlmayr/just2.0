using JUST.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using Backend.Data;
using System.Collections.Generic;
using System;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly JustDataContext context;

        public ProjectController(JustDataContext ctx)
        {
            context = ctx;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProjects()
        {
            return Ok(await context.Projects.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProjectById(int id)
        {
            var result = await context.Projects.FirstOrDefaultAsync(p => p.Id == id);

            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpGet("ids")]
        public async Task<IActionResult> GetProjectsById([FromBody] int[] ids)
        {

            var result = new List<Project>();
            foreach (int id in ids)
                result.Add(await context.Projects.FirstOrDefaultAsync(p => p.Id == id));
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> PostProject([FromBody] Project project)
        {
            if (project == null) return BadRequest("Project was empty");

            context.Projects.Add(project);
            await context.SaveChangesAsync();

            return Created(string.Empty, project);
        }

        [HttpGet("init")]
        public async Task<IActionResult> InitProjects()
        {
            var resultList = new List<Project>();
            var project1 = new Project
            {
                Title = "LeoGantt",
                StartDate = DateTime.Now,
                EndDate = DateTime.Now + TimeSpan.FromDays(7)
            };

            context.Projects.Add(project1);
            resultList.Add(project1);

            var project2 = new Project
            {
                Title = "LFVT",
                StartDate = DateTime.Now,
                EndDate = DateTime.Now + TimeSpan.FromDays(7)
            };

            context.Projects.Add(project2);
            resultList.Add(project2);
            await context.SaveChangesAsync();

            return Created(string.Empty, resultList);
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteProjectById([FromQuery] int id)
        {
            var project = await context.Projects.FirstOrDefaultAsync(x => x.Id == id);
            context.Projects.Remove(project);
            await context.SaveChangesAsync();

            return Ok(project);
        }
    }
}
