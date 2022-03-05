
using JUST.Data;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.IO;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using System.Collections.Generic;
using System.Linq;
using System;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly JustDataContext context;

        public FileController(JustDataContext ctx)
        {
            context = ctx;
        }

        [HttpGet, DisableRequestSizeLimit]
        [Route("download")]
        public IActionResult Download([FromQuery] int id)
        {
            ExportGanttAsync(id);


            byte[] fileBytes = null;
            string filePath = $"Exports\\Gantt{id}.xlsx";
            using (FileStream fs = System.IO.File.Open(filePath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
            {
                int numBytesToRead = Convert.ToInt32(fs.Length);
                fileBytes = new byte[(numBytesToRead)];
                fs.Read(fileBytes, 0, numBytesToRead);
            }

            return File(fileBytes, "text/xlsx", $"Gantt{id}.xlsx");
        }

        public async void ExportGanttAsync( int id)
        {
            var memoryStream = new MemoryStream();

            using (var fs = new FileStream($"Exports/Gantt{id}.xlsx", FileMode.Create, FileAccess.ReadWrite))
            {
                IWorkbook workbook = new XSSFWorkbook();
                ISheet excelSheet = workbook.CreateSheet("Sheet1");

                List<string> columns = new List<string>();
                columns.Add("Task");
                IRow row = excelSheet.CreateRow(0);
                row.CreateCell(0).SetCellValue("Task");

                var tableData = BuildTableData(id);
                var length = 0;
                foreach (var item in tableData)
                {
                    if (item.Offset > length)
                    {
                        length = item.Offset + item.Duration;
                    }
                }

                for (int i = 1; i < length; i++)
                {
                    columns.Add("Tag " + i);
                    row.CreateCell(i).SetCellValue("Tag " + (i));
                }

                var tasks = await context.Tasks.Where(task => task.ProjectId == id).ToArrayAsync();

                int rowIndex = 1;
                foreach (var task in tableData)
                {
                    row = excelSheet.CreateRow(rowIndex);
                    var draw = false;

                    row.CreateCell(0).SetCellValue(tasks[rowIndex - 1].Title);

                    for (int i = 1; i < columns.Count; i++)
                    {
                        if (i == task.Offset + 1)
                            draw = true;
                        else if (i == task.Offset + 1 + task.Duration)
                            draw = false;

                        var cell = row.CreateCell(i);
                        ICellStyle style = workbook.CreateCellStyle();
                        if (draw)
                        {
                            var color = IndexedColors.RoyalBlue.Index;
                            style.FillForegroundColor = color;
                            style.FillPattern = FillPattern.SolidForeground;

                            IFont font = workbook.CreateFont();
                            font.Color = color;
                            style.SetFont(font);

                            cell.CellStyle = style;
                        }
                        else
                        {
                            IFont font = workbook.CreateFont();
                            font.Color = IndexedColors.White.Index;
                            style.SetFont(font);
                            cell.CellStyle = style;
                        }
                    }
                    rowIndex++;
                }

                workbook.Write(fs);
                fs.Close();
            }
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

        public class TableData
        {
            public int Duration { get; set; }
            public int Offset { get; set; }
        }
    }
}
