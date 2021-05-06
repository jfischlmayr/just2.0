using System;
using System.ComponentModel.DataAnnotations;

namespace JUST.Data.Models
{
    public class JustTask
    {
        [Key]
        public int ID { get; set; }
        [MaxLength(100)]
        public string Name { get; set; }
        public bool Done { get; set; } = false;
        public DateTime StartDate { get; set; } = DateTime.Now;
        public DateTime EndDate { get; set; }
        public int? ProjectID { get; set; }
    }
}
