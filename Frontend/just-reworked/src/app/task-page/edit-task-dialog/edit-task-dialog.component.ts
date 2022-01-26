import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  GetProject,
  GetEditTaskDialogData,
  EditTask,
} from '../../model';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss'],
})
export class EditTaskDialogComponent implements OnInit {
  title: string = '';
  startDate!: Date;
  endDate!: Date;
  selectedProjectId: number = 0;
  projects: GetProject[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: GetEditTaskDialogData,
    private dialogRef: MatDialogRef<EditTaskDialogComponent>
  ) {}

  ngOnInit(): void {
    this.title = this.data.task.title;
    this.startDate = new Date(this.data.task.startDate);
    this.endDate = new Date(this.data.task.endDate);
    this.selectedProjectId = this.data.task.projectId;
    this.projects = this.data.projects;
  }

  submitDialog(): void {
    const editedTask: EditTask = {
      id: this.data.task.id,
      title: this.title,
      endDate: this.endDate,
      startDate: this.startDate,
      projectId: this.selectedProjectId,
    };
    this.dialogRef.close(editedTask);
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }
}
