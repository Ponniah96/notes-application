using System.Text.Json.Serialization;

namespace NotesApplication.Models
{
    public class NotesDBModel
    {
        public int id { get; set; }
        public string Notes { get; set; }
        public string users { get; set; }
    }
}
