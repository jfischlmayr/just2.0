import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


interface GetProject {
  id: number
  title: string
  startDate: Date
  endDate: Date
}

interface Project {
  title: string
  startDate: Date
  endDate: Date
}

interface GetTask {
  id: number
  title: string
  startDate: Date
  endDate: Date
  projectId: number
}

interface Task {
  title: string
  startDate: Date
  endDate: Date
  projectId: number
}

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss']
})
export class TaskPageComponent implements OnInit {
  showDelay = new FormControl(500);
  projects!: Observable<GetProject[]>;
  tasks!: Observable<GetTask[]>
  title: string = ''
  startDate!: Date
  endDate!: Date

  selectedProjectId!: number

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.projects = this.httpClient.get<GetProject[]>('https://localhost:5001/api/project');
    this.refresh();
  }

  onSubmit() {
    const task: Task = {
      title: this.title,
      startDate: this.startDate,
      endDate: this.endDate,
      projectId: this.selectedProjectId
    }

console.log('test')
    this.httpClient.post('https://localhost:5001/api/task', task).subscribe(() => this.refresh())

    this.title = ''
    this.startDate = new Date()
    this.endDate = new Date()
    this.refresh
  }

  refresh() {

    this.tasks = this.httpClient.get<GetTask[]>('https://localhost:5001/api/task')
  }

}
