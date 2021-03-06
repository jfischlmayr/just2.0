import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GetProject, GetTask, TableData } from '../model';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from '../globals.service';
import { FileService } from '../_service/file.service';

@Component({
  selector: 'app-old-gantt',
  templateUrl: './old-gantt.component.html',
  styleUrls: ['./old-gantt.component.scss']
})
export class OldGanttComponent implements OnInit {

  showDelay = new FormControl(500);
  projects: GetProject[] = [];
  selectedProject?: GetProject;
  timespan = require('timespan');
  tableData: TableData[] = [];
  tasks: GetTask[] = [];
  days: number[] = [];

  constructor(private httpClient: HttpClient, private globals : GlobalsService, private fileService: FileService) {
  }
  ngOnInit(): void {
    this.httpClient
      .get<GetProject[]>('https://localhost:5001/api/project')
      .subscribe((result) => {
        this.projects = result;
      });
    this.httpClient
      .get<GetTask[]>('https://localhost:5001/api/task')
      .subscribe((result) => {
        this.tasks = result;
      });
  }

  downloadGantt(id: number) {
    this.fileService.download(id).subscribe(response => {
      let fileName = response.headers.get('content-disposition')?.split(';')[1].split('=')[1]
      let blob: Blob = response.body as Blob
      let a = document.createElement('a')
      a.download = fileName!
      a.href = window.URL.createObjectURL(blob)
      a.click()
    })
  }

  calcDays(p: GetProject | undefined): void {
    var timeSpan = new this.timespan.TimeSpan();
    this.days = [];
    this.tableData = [];

    if (p) {
      var projTasks = this.tasks.filter((t) => t.projectId == p?.id);
      if (projTasks) {
        let dates = projTasks
          .map((p) => new Date(p.startDate))
          .concat(projTasks.map((p) => new Date(p.endDate)));
        let start = dates.reduce(function (a, b) {
          return a < b ? a : b;
        });
        let end = dates.reduce(function (a, b) {
          return a > b ? a : b;
        });

        timeSpan = this.timespan.fromDates(start, end, true);

        for (let i = 0; i < timeSpan.totalDays(); i++) {
          this.days.push(i + 1);
        }

        projTasks.forEach((t) => {
          let ts = this.timespan.fromDates(
            new Date(t.startDate),
            new Date(t.endDate),
            true
          );
          let off = this.timespan.fromDates(new Date(t.startDate), start, true);
          this.tableData.push({
            timespan: ts.totalDays(),
            offset: off.totalDays(),
          });
        });
      }
    }
  }

  fillTableBackground(taskIdx: number, dayIdx: number): string {
    if (
      this.tableData[taskIdx].offset <= dayIdx &&
      this.tableData[taskIdx].offset + this.tableData[taskIdx].timespan > dayIdx
    ) {
      return '#6b97ff';
    }
    return 'white';
  }

  fillTableBorder(taskIdx: number, dayIdx: number): string {


        if (
      this.tableData[taskIdx].offset <= dayIdx &&
      this.tableData[taskIdx].offset + this.tableData[taskIdx].timespan > dayIdx
    ) {

      if (this.tableData[taskIdx].offset == dayIdx && !(this.tableData[taskIdx].timespan + this.tableData[taskIdx].offset - 1 == dayIdx)) {
          console.log("left edge -- task: " + this.tasksToShow()[taskIdx].title + " offset: " + this.tableData[taskIdx].offset + " day: " + dayIdx + " timespan: " + this.tableData[taskIdx].timespan)

        return '20px 0 0 20px';
      } else if (
        this.roundOffset(this.tableData[taskIdx].timespan + this.tableData[taskIdx].offset - 1)
         == dayIdx && !(this.tableData[taskIdx].offset == dayIdx)
      ) {

          console.log("right edge -- task: " + this.tasksToShow()[taskIdx].title + " offset: " + this.tableData[taskIdx].offset + " day: " + dayIdx)

        return '0 20px 20px 0'; //oben, rechts, unten, links
      } else if (
        this.tableData[taskIdx].timespan + this.tableData[taskIdx].offset - 1 == dayIdx
      ) {
        console.log("round -- " + this.tasksToShow()[taskIdx].title + " offset: " + this.tableData[taskIdx].offset + " day: " + dayIdx + " timespan: " + this.tableData[taskIdx].timespan)
        return '20px 20px 20px 20px';
      } else{
        console.log("??? -- task: " + this.tasksToShow()[taskIdx].title + " offset: " + this.tableData[taskIdx].offset + " day: " + dayIdx + " timespan: " + this.tableData[taskIdx].timespan)
      }
    }
    return '0px';
  }

  roundOffset(offset: number): number{
    if(Math.round(offset) - offset > 0){
      return Math.round(offset);
    }else if(Math.round(offset) - offset<0){
      return Math.round(offset)+1;
    }
    return offset;
  }

  calcDuration(t: GetTask): number {
    var timeSpan = new this.timespan.TimeSpan();
    const start = new Date(t.startDate);
    const end = new Date(t.endDate);
    timeSpan = this.timespan.fromDates(start, end, true);
    return timeSpan.days;
  }

  tasksToShow(): GetTask[] {
    let tasks = [];
    tasks = this.tasks.filter((t) => t.projectId == this.selectedProject?.id);
    return tasks;
  }

  showTooltipMessage(t: GetTask): String {
    const start = new Date(t.startDate);
    const end = new Date(t.endDate);
    return `${
      t.title
    }: ${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
  }

}
