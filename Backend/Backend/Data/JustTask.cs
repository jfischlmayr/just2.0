using Backend.Data;
using System;
using System.ComponentModel.DataAnnotations;

namespace JUST.Data.Models
{
    public class JustTask
    {
        public int Id { get; set; }
        [MaxLength(100)]
        public string Title { get; set; }
        public DateTime StartDate { get; set; } = DateTime.Now;
        public DateTime EndDate { get; set; }
        public TimeSpan? Duration { get { return EndDate - StartDate; } }
        public int ProjectId { get; set; }
    }
}
