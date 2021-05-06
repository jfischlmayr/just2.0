using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace JUST.Data.Models
{
    public class Project
    {
        [Key]
        public int ID { get; set; }
        [MaxLength(100)]
        public string Title { get; set; }
        public DateTime StartDate { get; set; } = DateTime.Now;
        public DateTime EndDate { get; set; }
        public List<JustTask>? Tasks { get; set; }
    }
}