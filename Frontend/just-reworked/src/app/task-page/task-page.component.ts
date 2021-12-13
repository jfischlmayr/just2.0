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
  tasks?: GetTask[]
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
    this.refresh()
  }

  refresh() {
    this.httpClient.get<GetTask[]>('https://localhost:5001/api/task').subscribe(result => {
      this.tasks = result
    })
  }

  /*editTask(t : GetTask) : void{
    const dialogRef = this.dialog.open(EditDialogComponent,{
      data:p,
      panelClass: 'custom-dialog-container'
    })
    .afterClosed().subscribe( result => {
      this.projectToEdit = result

      this.httpClient.put('https://localhost:5001/api/project', this.projectToEdit).subscribe(() => this.refresh())
    })
  }*/

  deleteTask(id: number){
    this.httpClient.delete(`https://localhost:5001/api/task?id=${id}`).subscribe(() => this.refresh())
  }
}
