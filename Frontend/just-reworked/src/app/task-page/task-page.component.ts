import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Task, GetTask, GetProject } from '../model'

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
  taskToEdit?: GetTask

  constructor(private httpClient: HttpClient, private router: Router, public dialog: MatDialog) { }

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

    this.title = ''
    this.startDate = new Date()
    this.endDate = new Date()

    this.httpClient.post('https://localhost:5001/api/task', task).subscribe(() => this.refresh())
  }

  refresh() {
    this.httpClient.get<GetTask[]>('https://localhost:5001/api/task').subscribe(result => {
      this.tasks = result
    })
  }

  editTask(t : GetTask) : void{
    /*const dialogRef = this.dialog.open(EditDialogComponent,{
      data:t,
      panelClass: 'custom-dialog-container'
    })
    .afterClosed().subscribe( result => {
      this.taskToEdit = result

      this.httpClient.put('https://localhost:5001/api/project', this.taskToEdit).subscribe(() => this.refresh())
    })*/
  }

  deleteTask(id: number){
    this.httpClient.delete(`https://localhost:5001/api/task?id=${id}`).subscribe(() => this.refresh())
  }
}
