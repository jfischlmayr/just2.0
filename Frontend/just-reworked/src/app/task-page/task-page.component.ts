import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Task, GetTask, GetProject, EditTask } from '../model';
import { EditTaskDialogComponent } from './edit-task-dialog/edit-task-dialog.component';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss'],
})
export class TaskPageComponent implements OnInit {
  showDelay = new FormControl(500);
  projects?: GetProject[];
  tasks?: GetTask[];
  title: string = '';
  projectTitle?: string = '';
  startDate?: Date;
  endDate?: Date;
  taskToEdit?: EditTask;
  minDate?: Date
  maxDate?: Date

  constructor(
    private httpClient: HttpClient,
    public dialog: MatDialog,
    private globals: GlobalsService
  ) {
    this.httpClient
    .get<GetProject[]>('https://localhost:5001/api/project')
    .subscribe((result) => {
      var project = result.find(p => p.id == globals.getPjId())
      this.minDate = new Date(Date.parse(project?.startDate!))
      this.maxDate = new Date(Date.parse(project?.endDate!))
      this.projectTitle = project?.title;
    });
  }

  ngOnInit(): void {
    this.refresh();
  }

  onSubmit() {
    if(this.startDate != undefined && this.endDate != undefined) {
      const task: Task = {
        title: this.title,
        startDate: this.startDate,
        endDate: this.endDate,
        projectId: this.globals.getPjId(),
      };
      this.title = '';
      this.startDate = undefined;
      this.endDate = undefined;
      this.httpClient
        .post('https://localhost:5001/api/task', task)
        .subscribe(() => this.refresh());
    }
  }

  refresh() {
    this.httpClient
      .get<GetTask[]>(`https://localhost:5001/api/task/fromproject?id=${this.globals.getPjId()}`)
      .subscribe((result) => {
        this.tasks = result;
        console.log(result)
      });
  }

  editTask(t: GetTask): void {
    const dialogRef = this.dialog
      .open(EditTaskDialogComponent, {
        data: { task: t, projects: this.projects },
        panelClass: 'custom-dialog-container',
      })
      .afterClosed()
      .subscribe((result) => {
        this.taskToEdit = result;

        this.httpClient
          .put('https://localhost:5001/api/task', this.taskToEdit)
          .subscribe(() => this.refresh());
      });
  }

  deleteTask(id: number) {
    this.httpClient
      .delete(`https://localhost:5001/api/task?id=${id}`)
      .subscribe(() => this.refresh());
  }
}
