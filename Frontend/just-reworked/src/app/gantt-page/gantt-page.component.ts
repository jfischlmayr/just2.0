import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GetProject, GetTask } from '../model';
import { HttpClient } from '@angular/common/http';
import { ProjectPageComponent } from '../project-page/project-page.component';
import { start } from 'repl';

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
  days: number[] = []
  tasks: GetTask[] = []

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

  calcDays(p : GetProject|undefined) : string{
    var timeSpan = new this.timespan.TimeSpan()
    if(p){
      const start = new Date(p.startDate)
      const end  = new Date(p.endDate)
      timeSpan = this.timespan.fromDates(start, end, true)

      this.days = []

      for (let i = 0; i < timeSpan.days; i++) {
        this.days.push(i + 1)
      }
    }

    return `${timeSpan}`
  }

  calcDuration(t: GetTask) : number {
    var timeSpan = new this.timespan.TimeSpan()
    const start = new Date(t.startDate)
    const end  = new Date(t.endDate)
    timeSpan = this.timespan.fromDates(start, end, true)
    return timeSpan.days
  }
}
