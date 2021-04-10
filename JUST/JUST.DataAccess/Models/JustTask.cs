using System.ComponentModel.DataAnnotations;

namespace JUST.DataAccess
{
    public class JustTask
    {
        [Key]
        public int ID { get; set; }
        [MaxLength(100)]
        public string Name { get; set; }
        public bool Done { get; set; } = false;
        public int? MemberID { get; set; }
        public int? ProjectID { get; set; }
    }
}
