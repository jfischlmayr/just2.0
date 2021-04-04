using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Project
    {
        [Key]
        public int ID { get; set; }
        [MaxLength(100)]
        public string Title { get; set; }
        public List<Task>? Tasks { get; set; }
        //[MaxLength(1000)]
        //public string Notes { get; set; }
        //public DateTime From { get; set; }
        //public DateTime To { get; set; }
        //public Address Address { get; set; }
        //public int Priority { get; set; }
    }
}
