using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace JUST.DataAccess.Models
{
    public class Project
    {
        [Key]
        public int ID { get; set; }
        [MaxLength(100)]
        public string Title { get; set; }
        public List<JustTask>? Tasks { get; set; }
    }
}