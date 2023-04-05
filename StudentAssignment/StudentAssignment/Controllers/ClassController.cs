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
    //All Crud Operation and Working fine.
    public class ClassController : ControllerBase
    {
        private readonly StudentManagementDbContext _context;
        public ClassController(StudentManagementDbContext context)
        {
            _context = context;
        }
        //Get All Details
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Class>>> GetClasses()
        {
            return await _context.Classs.ToListAsync();
        }
        //Get Details by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<List<Class>>> Get(int id)
        {
            var Class = await _context.Classs
                .Where(x => x.Id == id).Include(e => e.Teachers).ThenInclude(e => e.Subjects)
                .ToListAsync();

            return Ok(Class);
        }
        //Post Data fetch in fronend Details
        [HttpPost]
        public async Task<ActionResult<List<Class>>> Create(Class classs)
        {
            var NewClass = new Class
            {
               Id= classs.Id,
               ClassName= classs.ClassName
            };

            _context.Classs.Add(NewClass);
            await _context.SaveChangesAsync();
            return Ok(NewClass);
        }
        //Delete Data by id
        [HttpPost("DeleteClass")]
        public async Task<ActionResult> RemoveClass(UpdateClassViewModel clas)
        {
            try
            {
                var Classes =  _context.Classs.Where(c => c.Id == clas.Id).FirstOrDefault();
                if (Classes == null)
                    return NotFound();

                _context.Classs.Remove(Classes);
                await _context.SaveChangesAsync();
                return Ok(Classes);
            }
            catch (Exception e)
            {
                return new JsonResult(false);
            }
        }
        //Post Class and Teacher RelationShip
        [HttpPost("ClassAndTeacher")]
        public async Task<ActionResult<List<Class>>> AddClassTeacher(ClassAndTeacherDto Class)
        {
            var ClassAndTeacher = await _context.Classs.Where(c => c.Id == Class.ClasssId).Include(c => c.Teachers).FirstOrDefaultAsync();
            if (ClassAndTeacher == null)
                return NotFound();

            var Teacher = await _context.Teachers.FindAsync(Class.TeachersId);
            if (Teacher == null)
                return NotFound();

            ClassAndTeacher.Teachers.Add(Teacher);
            await _context.SaveChangesAsync();
            return Ok(ClassAndTeacher);
        }
        //Delete Class and Teacher Relationship
        [HttpPost("TeacherAndClassDelete")]
        public async Task<ActionResult<List<Class>>> RemoveTeacherAndSubject(ClassAndTeacherDto Class)
        {
            try
            {
                var ClassAndTeacher = await _context.Classs.Where(c => c.Id == Class.ClasssId).Include(c => c.Teachers).FirstOrDefaultAsync();
                if (ClassAndTeacher == null)
                    return NotFound();

                var Teacher = await _context.Teachers.FindAsync(Class.TeachersId);
                if (Teacher == null)
                    return NotFound();
                ClassAndTeacher.Teachers.Remove(Teacher);
                await _context.SaveChangesAsync();
                return Ok(Class);
            }
            catch (Exception e)
            {
                return new JsonResult(false);
            }
        }
    }
}
