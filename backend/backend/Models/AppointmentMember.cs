using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class AppointmentMember
    {
        [Key]
        public int AM_ID { get; set; }
        public int AppointmentID { get; set; }
        public int MemberID { get; set; }
    }
}
