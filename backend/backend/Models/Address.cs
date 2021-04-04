using System.ComponentModel.DataAnnotations;

namespace backend.Models
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