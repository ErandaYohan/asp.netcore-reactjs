using Microsoft.EntityFrameworkCore;
using StudentAssignment.Model;

namespace StudentAssignment.Data
{
    public class StudentManagementDbContext : DbContext
    {
        public StudentManagementDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Class> Classs { get; set; }
        public DbSet<Student> Students { get; set; }
    }
}
