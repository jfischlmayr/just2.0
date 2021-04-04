using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class MemberRole
    {
        [Key]
        public int ID { get; set; }
        public int MemberID { get; set; }
        public int RoleID { get; set; }
        public int ProjectID { get; set; }
    }
}