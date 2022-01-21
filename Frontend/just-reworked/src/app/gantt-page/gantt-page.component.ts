import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GetProject, GetTask, TableData } from '../model';
import { HttpClient } from '@angular/common/http';
import { ProjectPageComponent } from '../project-page/project-page.component';

interface Project{
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-gantt-page',
  templateUrl: './gantt-page.component.html',
  styleUrls: ['./gantt-page.component.scss']
})
export class GanttPageComponent implements OnInit {
  showDelay = new FormControl(500)
  projects: GetProject[] = []
  selectedProject? : GetProject
  timespan = require('timespan')
  tableData: TableData[] = []
  tasks: GetTask[] = []
  days: number[] = [];

  constructor(private httpClient : HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get<GetProject[]>('https://localhost:5001/api/project').subscribe(result =>{
      this.projects = result
    });
    this.httpClient.get<GetTask[]>('https://localhost:5001/api/task').subscribe(result =>{
      this.tasks = result
    });
  }

  createGantt(): void{

  }

  calcDays(p : GetProject|undefined) : void{
    var timeSpan = new this.timespan.TimeSpan()
    this.days = []
    this.tableData = []

    if(p){
      var projTasks = this.tasks.filter(t => t.projectId == p?.id);
      if(projTasks){
        let dates = projTasks.map( p => new Date(p.startDate)).concat(projTasks.map( p => new Date(p.endDate)))
        let start = dates.reduce(function (a, b) { return a < b ? a : b; });
        let end = dates.reduce(function (a, b) { return a > b ? a : b; });

        timeSpan = this.timespan.fromDates(start, end, true)

        for (let i = 0; i < timeSpan.totalDays(); i++) {
          this.days.push(i + 1)
        }

        projTasks.forEach(t => {
          let ts = this.timespan.fromDates(new Date(t.startDate), new Date(t.endDate), true)
          let off = this.timespan.fromDates(new Date(t.startDate), start, true)
          this.tableData.push({timespan: ts.totalDays(), offset: off.totalDays()})
        })
      }

    }
  }

  fillTable(taskIdx: number, dayIdx: number) : string{

    if(this.tableData[taskIdx].offset <= dayIdx && this.tableData[taskIdx].offset + this.tableData[taskIdx].timespan > dayIdx){

      return "red"
    }
    return "white"
  }

  calcDuration(t: GetTask) : number {
    var timeSpan = new this.timespan.TimeSpan()
    const start = new Date(t.startDate)
    const end  = new Date(t.endDate)
    timeSpan = this.timespan.fromDates(start, end, true)
    return timeSpan.days
  }
}
