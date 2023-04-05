using System.Text.Json.Serialization;

namespace StudentAssignment.Model
{
    public class Class
    {
        public int Id { get; set; }
        public string ClassName { get; set; }
        [JsonIgnore]
        public List<Teacher> Teachers { get; set; }
    }
}
