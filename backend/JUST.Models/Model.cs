using System;
using System.ComponentModel.DataAnnotations;

namespace JUST.Models
{
    public class TodoDto
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
