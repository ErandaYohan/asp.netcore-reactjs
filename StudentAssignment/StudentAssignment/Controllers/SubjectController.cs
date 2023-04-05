using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentAssignment.Data;
using StudentAssignment.Model;

namespace StudentAssignment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectController : ControllerBase
    {
        private readonly StudentManagementDbContext _context;
        public SubjectController(StudentManagementDbContext context)
        {
            _context = context;
        }
        //Get All Details
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Subject>>> GetSubjects()
        {
            return await _context.Subjects.ToListAsync();
        }
        //Get Details by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<List<Subject>>> Get(int id)
        {
            var Subject = await _context.Subjects
                .Where(x => x.Id == id)
                .ToListAsync();

            return Ok(Subject);
        }
        //Post Data fetch in fronend Details
        [HttpPost]
        public async Task<ActionResult<List<Subject>>> Create(Subject subject)
        {
            var NewSubject = new Subject
            {
                Id= subject.Id,
                SubjectName = subject.SubjectName
            };

            _context.Subjects.Add(NewSubject);
            await _context.SaveChangesAsync();
            return Ok(NewSubject);
        }
        //Delete Data by id
        [HttpPost("DeleteSubject")]
        public async Task<ActionResult> RemoveSubject(Subject subject)
        {
            try
            {
                var Subject = _context.Subjects.Where(c => c.Id == subject.Id).FirstOrDefault();
                if (Subject == null)
                    return NotFound();

                _context.Subjects.Remove(Subject);
                await _context.SaveChangesAsync();
                return Ok(subject);
            }
            catch (Exception e)
            {
                return new JsonResult(false);
            }
        }
    }
}
