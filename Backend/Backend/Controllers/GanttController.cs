using JUST.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GanttController : ControllerBase
    {
        private readonly JustDataContext context;

        public GanttController(JustDataContext ctx)
        {
            context = ctx;
        }

        [HttpGet]
        public async Task<IActionResult> GetTableData([FromQuery] int id)
        {
            var result = BuildTableData(id);

            return Ok(result);
        }

        public List<TableData> BuildTableData(int id)
        {
            var tasks = context.Tasks.Where(t => t.ProjectId == id);

            var startDate = DateTime.MaxValue;
            var endDate = new DateTime();

            var result = new List<TableData>();

            foreach (var item in tasks)
            {
                if (item.StartDate.Ticks < startDate.Ticks)
                    startDate = item.StartDate;
                if (item.EndDate.Ticks > endDate.Ticks)
                    endDate = item.EndDate;
            }

            foreach (var item in tasks)
            {
                result.Add(new TableData { Duration = item.Duration.Days, Offset = (item.StartDate - startDate).Days });
            }

            return result;
        }

        [HttpGet("export")]
        public IActionResult ExportGantt([FromQuery] int id)
        {
            //DataTable table = (DataTable)JsonConvert.DeserializeObject(JsonConvert.SerializeObject(), (typeof(DataTable)));
            var memoryStream = new MemoryStream();

            using (var fs = new FileStream("Gantt.xlsx", FileMode.Create, FileAccess.Write))
            {
                IWorkbook workbook = new XSSFWorkbook();
                ISheet excelSheet = workbook.CreateSheet("Sheet1");

                List<string> columns = new List<string>();
                columns.Add("Task");
                IRow row = excelSheet.CreateRow(0);
                int columnIndex = 0;

                var tableData = BuildTableData(id);
                var length = 0;
                foreach (var item in tableData)
                {
                    if (item.Offset > length)
                    {
                        length = item.Offset;
                    }
                }

                for (int i = 0; i < length; i++)
                {
                    columns.Add("Tag " + i + 1);
                    row.CreateCell(columnIndex).SetCellValue("Tag " + i + 1);
                    columnIndex++;
                }

                int rowIndex = 1; 
                foreach (var task in tableData)
                {
                    row = excelSheet.CreateRow(rowIndex);
                    var draw = false;
                    for (int i = 0; i < columns.Count; i++)
                    {
                        if (i == task.Offset)
                            draw = true;
                        else if (i + task.Duration == task.Offset + task.Duration)
                            draw = false;

                        if (draw)
                        {
                            row.CreateCell(i).SetCellValue(1);
                        }
                        else
                        {
                            row.CreateCell(i).SetCellValue(0);

                        }
                    }
                    rowIndex++;
                }
                
                workbook.Write(fs);
            }
            return Ok();
        }
    }

    public class TableData
    {
        public int Duration { get; set; }
        public int Offset { get; set; }
    }
}
