using System.Text.Json.Serialization;

namespace StudentAssignment.Model
{
    public class Subject
    {
        public int Id { get; set; }
        public string SubjectName { get; set; }
        [JsonIgnore]
        public List<Teacher> Teachers { get; set; }
    }
}
