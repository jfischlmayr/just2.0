using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly JustDataContext _context;

        public ProjectController(JustDataContext context)
        {
            _context = context;
        }

        [Route("init")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> InitProjects()
        {
            Project project = new();
            Address address = new();

            address.Street = "Stadlerstraße";
            address.HouseNumber = "17";
            address.City = "Linz";
            address.ZIPCode = 4020;

            project.Title = "Fling";
            //project.Notes = "An application for transfering Handy notifications to an pc";
            //project.From = DateTime.Parse("09-10-2020");
            //project.To = DateTime.Parse("09-05-2021");
            //project.Address = address;

            await _context.AddAsync(project);
            await _context.SaveChangesAsync();
            return await _context.Projects.ToListAsync();
        }

        // GET: api/<ProjectController>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Models.Project>))]
        public async Task<IActionResult> GetAll()
        {
            var list = await _context.Projects.ToListAsync();

            return Ok(list.OrderBy(p => p.Title));
        }

        // GET api/<ProjectController>/5
        [HttpGet("{id}", Name = nameof(GetProjectById))]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Models.Project))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetProjectById(int id)
        {
            var existingProject = await _context.Projects.FirstOrDefaultAsync(p => p.ID == id);
            if (existingProject == null) return NotFound();
            return Ok(existingProject);
        }

        // POST api/<ProjectController>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Models.Project))]
        public async Task<IActionResult> Add([FromBody] Models.Project newProject)
        {
            await _context.Projects.AddAsync(newProject);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProjectById), new { id = newProject.ID }, newProject);
        }

        // PUT api/<ProjectController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProject(int id, Project project)
        {
            if (id != project.ID)
            {
                return BadRequest();
            }

            _context.Entry(project).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE api/<ProjectController>/5
        [HttpDelete("{projectToDeleteId}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> Delete(int projectToDeleteId)
        {
            try
            {
                _context.Projects.Remove(_context.Projects.Find(projectToDeleteId));
                await _context.SaveChangesAsync();
            }
            catch (ArgumentException)
            {
                return NotFound();
            }
            return NoContent();
        }

        private bool ProjectExists(int id)
        {
            return _context.Projects.Any(e => e.ID == id);
        }
    }
}
