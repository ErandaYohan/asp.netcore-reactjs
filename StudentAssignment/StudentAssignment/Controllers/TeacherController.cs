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
    public class TeacherController : ControllerBase
    {
        private readonly StudentManagementDbContext _context;
        public TeacherController(StudentManagementDbContext context)
        {
            _context = context;
        }
        //Get All Details
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Teacher>>> GetTeachers()
        {
            return await _context.Teachers.ToListAsync();
        }
        //Get Details by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<List<Teacher>>> Get(int id)
        {
            var Teacher = await _context.Teachers
                .Where(x => x.Id == id).Include(e => e.Subjects).Include(e => e.Classs)
                .ToListAsync();

            return Ok(Teacher);
        }
        //Post Data fetch in fronend Details
        [HttpPost]
        public async Task<ActionResult<List<Teacher>>> Create(Teacher teacher)
        {
            
            var NewTeacher = new Teacher
            {
                FirstName = teacher.FirstName,
                LastName = teacher.LastName,
                Email = teacher.Email,
                ContactNo = teacher.ContactNo
            };

            _context.Teachers.Add(NewTeacher);
            await _context.SaveChangesAsync();
            return Ok(NewTeacher);
        }
        //Delete Data by id
        [HttpPost("DeleteTeacher")]
        public async Task<ActionResult> RemoveTeacher(Teacher teacher)
        {
            try
            {
                var Teacher = _context.Teachers.Where(c => c.Id == teacher.Id).FirstOrDefault();
                if (Teacher == null)
                    return NotFound();

                _context.Teachers.Remove(Teacher);
                await _context.SaveChangesAsync();
                return Ok(teacher);
            }
            catch (Exception e)
            {
                return new JsonResult(false);
            }
        }
        //Update Teacher Details
        [HttpPost("UpdateTeacher")]
        public ActionResult EditTeacher(UpdateTeacherViewModel teacher)
        {
            try
            {
                var Teacher = _context.Teachers.Where(c => c.Id == teacher.Id).FirstOrDefault();
                if (Teacher == null)
                    return NotFound();
                {
                    Teacher.FirstName = teacher.FirstName;
                    Teacher.LastName = teacher.LastName;
                    Teacher.ContactNo = teacher.ContactNo;
                    Teacher.Email = teacher.Email;
                }
                
                _context.SaveChanges();
                return Ok(teacher);
            }
            catch (Exception e)
            {
                return new JsonResult(false);
            }
        }
        //Post Class and Teacher RelationShip
        [HttpPost("TeacherAndSubject")]
        public async Task<ActionResult<List<Teacher>>> AddTeacherSubject(TeacherDto teacher)
        {
            var Teacher = await _context.Teachers.Where(c => c.Id == teacher.TeachersId).Include(c => c.Subjects).FirstOrDefaultAsync();
            if (Teacher == null)
                return NotFound();

            var Subject = await _context.Subjects.FindAsync(teacher.SubjectsId);
            if (Subject == null)
                return NotFound();

            Teacher.Subjects.Add(Subject);
            await _context.SaveChangesAsync();
            return Ok(Teacher);
        }
        //Delete Class and Teacher Relationship
        [HttpPost("TeacherAndSubjectDelete")]
        public async Task<ActionResult<List<Teacher>>> RemoveTeacherAndSubject(TeacherDto teacher)
        {
            try
            {
                var Teacher = await _context.Teachers.Where(c => c.Id == teacher.TeachersId).Include(c => c.Subjects).FirstOrDefaultAsync();
                if (Teacher == null)
                    return NotFound();

                var Subject = await _context.Subjects.FindAsync(teacher.SubjectsId);
                if (Subject == null)
                    return NotFound();
                Teacher.Subjects.Remove(Subject);
                await _context.SaveChangesAsync();
                return Ok(Teacher);
            }
            catch (Exception e)
            {
                return new JsonResult(false);
            }
        }
    }
}
