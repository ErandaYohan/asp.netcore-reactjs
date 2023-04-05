using System.Text.Json.Serialization;

namespace StudentAssignment.Model
{
    public class Teacher
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int ContactNo { get; set; }
        public string Email { get; set; }
        public List<Subject> Subjects { get; set; }
        
        public List<Class> Classs { get; set; }
    }
}
