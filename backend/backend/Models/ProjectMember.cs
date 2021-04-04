using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class ProjectMember
    {
        [Key]
        public int ID { get; set; }
        public int MemberID { get; set; }
        public int ProjectID { get; set; }
    }
}
