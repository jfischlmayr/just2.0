using JUST.Data.Models;
using System;
using System.Collections.Generic;

namespace Backend.Data
{
    public class Project
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Description { get; set; }
        public List<JustTask>? Tasks { get; set; }
    }
}
