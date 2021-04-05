using AutoMapper;
using backend.Models;
using JUST.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        private readonly JustDataContext _context;

        public TodosController(JustDataContext context)
        {
            _context = context;
        }

        

        // GET api/Todos
        [HttpGet]
        public async Task<List<TodoDto>> GetTodosAsync()
        {
            var configuration = new MapperConfiguration(cfg => {
                cfg.CreateMap<List<Todo>, List<TodoDto>>();
            });

            IMapper iMapper = configuration.CreateMapper();


            var todos = iMapper.Map<List<Todo>, List<TodoDto>>(await _context.Todos.ToListAsync());
                
            return await Task.FromResult(todos);
        }

        // GET api/Todos/5
        [HttpGet("{id}", Name = nameof(GetTodo))]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(TodoDto))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetTodo(int id)
        {
            var configuration = new MapperConfiguration(cfg => {
                cfg.CreateMap<Todo, TodoDto>();
            });

            IMapper iMapper = configuration.CreateMapper();

            var todo = iMapper.Map<Todo, TodoDto>(await _context.Todos.FirstOrDefaultAsync(t => t.ID == id));

            if (todo == null)
            {
                return NotFound();
            }

            return Ok(todo);
        }

        //[HttpGet]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Todo>))]
        //public async Task<IActionResult> GetAll()
        //{
        //    var list = await _context.Todos.ToListAsync();

        //    return Ok(list.OrderBy(t => t.Name));
        //}

        //[HttpGet("{id}", Name = nameof(GetById))]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Todo))]
        //[ProducesResponseType(StatusCodes.Status404NotFound)]
        //public async Task<IActionResult> GetById(int id)
        //{
        //    var existingTask = await _context.Todos.FirstOrDefaultAsync(t => t.ID == id);
        //    if (existingTask == null) return NotFound();
        //    return Ok(existingTask);
        //}

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Todo))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Add([FromBody] TodoDto newTodo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var configuration = new MapperConfiguration(cfg => {
                cfg.CreateMap<TodoDto, Todo>();
            });

            IMapper iMapper = configuration.CreateMapper();

            var todo = iMapper.Map<TodoDto, Todo>(newTodo);
              _context.Todos.Add(todo);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTodo), new { id = newTodo.ID }, todo);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Todo))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Put(int id, [FromBody] Todo taskToModify)
        {
            if (id != taskToModify.ID)
            {
                return BadRequest();
            }

            _context.Entry(taskToModify).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(id))
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

        [HttpDelete("{taskToDeleteId}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> Delete(int taskToDeleteId)
        {
            try
            {
                _context.Todos.Remove(_context.Todos.Find(taskToDeleteId));
                await _context.SaveChangesAsync();
            }
            catch (ArgumentException)
            {
                return NotFound();
            }
            return NoContent();
        }

        private bool TaskExists(int id)
        {
            return _context.Todos.Any(t => t.ID == id);
        }
    }
}
