using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentAssignment.Data;
using StudentAssignment.Model;
using StudentAssignment.Model.Dto;

namespace StudentAssignment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly StudentManagementDbContext _context;
        public StudentController(StudentManagementDbContext context) 
        { 
            _context = context;
        }
        //Get All Details
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
        {

            return await _context.Students.Include(c=>c.Class).ToListAsync();
        }
        //Get Details by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<List<Student>>> Get(int id)
        {
            var Students = await _context.Students
                .Where(x => x.Id == id)
                .Include(c => c.Class).ThenInclude(a => a.Teachers).ThenInclude(a=>a.Subjects)
                .ToListAsync();

            return Ok(Students);
        }
        //Post Data fetch in fronend Details
        [HttpPost]
        public async Task<ActionResult<List<Student>>> Create(StudentDto student)
        {
            var today = DateTime.Today;
            var Class = await _context.Classs.FindAsync(student.ClassId);
            if (Class == null)
                return NotFound();
            var NewStudent = new Student
            {
                FirstName = student.FirstName,
                LastName = student.LastName,
                ContactPerson = student.ContactPerson,
                ContactNo = student.ContactNo,
                EmailAddress = student.EmailAddress,
                DateOfBirth = student.DateOfBirth,
                Age = today.Year - student.DateOfBirth.Year,
                Class = Class
            };

            _context.Students.Add(NewStudent);
            await _context.SaveChangesAsync();
            return Ok(NewStudent);
        }
        //Delete Data by id
        [HttpPost("DeleteStudent")]
        public async Task<ActionResult> RemoveStudent(Student student)
        {
            try
            {
                var Student = _context.Students.Where(c => c.Id == student.Id).FirstOrDefault();
                if (Student == null)
                    return NotFound();

                _context.Students.Remove(Student);
                await _context.SaveChangesAsync();
                return Ok(Student);
            }
            catch (Exception e)
            {
                return new JsonResult(false);
            }
        }
    }
}
