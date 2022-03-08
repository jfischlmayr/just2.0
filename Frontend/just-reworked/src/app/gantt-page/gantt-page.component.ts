import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GetProject, GetTask, TableData } from '../model';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-gantt-page',
  templateUrl: './gantt-page.component.html',
  styleUrls: ['./gantt-page.component.scss'],
})
export class GanttPageComponent implements OnInit {
  showDelay = new FormControl(500);
  timespan = require('timespan');
  tableData: TableData[] = [];
  tasks: GetTask[] = [];
  days: number[] = [];

  constructor(private httpClient: HttpClient, private globals : GlobalsService) {}

  ngOnInit(): void {
    const selectedProjectId = this.globals.getPjId()
    this.httpClient
      .get<GetTask[]>(`https://localhost:5001/api/task/fromproject?id=${this.globals.getPjId()}`)
      .subscribe((result) => {
        this.tasks = result;
        this.calcDays()
      });
  }

  downloadGantt(): void {
    this.httpClient
      .get(`https://localhost:5001/api/gantt/export?id=${this.globals.getPjId()}`)
      .subscribe();
  }

  calcDays(): void {
    var timeSpan = new this.timespan.TimeSpan();
    this.days = [];
    this.tableData = [];

    if (this.tasks.length > 0) {
      let dates = this.tasks
        .map((p) => new Date(p.startDate))
        .concat(this.tasks.map((p) => new Date(p.endDate)));
      console.log(dates)
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

      this.tasks.forEach((t) => {
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
      console.log(this.tableData)
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

    return '20px 0 0 20px'; 
  } else if (
    this.tableData[taskIdx].timespan + this.tableData[taskIdx].offset - 1 == dayIdx && !(this.tableData[taskIdx].offset == dayIdx)
  ) {
     
    return '0 20px 20px 0'; //oben, rechts, unten, links
  } else if (
    this.tableData[taskIdx].timespan + this.tableData[taskIdx].offset - 1 == dayIdx
  ) {
    return '20px 20px 20px 20px';
  }
}
return '0px';
}

  roundOffset(offset: number): number{
    if(Math.round(offset) - offset > 0){
      return Math.round(offset);
    }
    return Math.round(offset)+1;
  }

  calcDuration(t: GetTask): number {
    var timeSpan = new this.timespan.TimeSpan();
    const start = new Date(t.startDate);
    const end = new Date(t.endDate);
    timeSpan = this.timespan.fromDates(start, end, true);
    return timeSpan.days;
  }

  showTooltipMessage(t: GetTask): String {
    const start = new Date(t.startDate);
    const end = new Date(t.endDate);
    return `${
      t.title
    }: ${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
  }
}
