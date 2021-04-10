using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JUST.DataAccess.Models
{
    public class Address
    {
        [Key]
        public int ID { get; set; }
        [MaxLength(50)]
        public string Street { get; set; }
        [MaxLength(10)]
        public string HouseNumber { get; set; }
        [MaxLength(50)]
        public string City { get; set; }
        public int ZIPCode { get; set; }
    }
}
