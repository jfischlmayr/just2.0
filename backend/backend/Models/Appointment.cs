using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Appointment
    {
        [Key]
        public int ID { get; set; }
        [MaxLength(50)]
        public string AppointmentName { get; set; }
        [MaxLength(1000)]
        public string Notes { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
    }
}
