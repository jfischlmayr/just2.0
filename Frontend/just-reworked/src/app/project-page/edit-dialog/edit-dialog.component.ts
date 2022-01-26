import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetProject } from '../../model';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent implements OnInit {
  title: string = '';
  startDate!: Date;
  endDate!: Date;
  description: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: GetProject,
    private dialogRef: MatDialogRef<EditDialogComponent>
  ) {}

  ngOnInit(): void {
    this.title = this.data.title;
    this.startDate = new Date(this.data.startDate);
    this.endDate = new Date(this.data.endDate);
    this.description = this.data.description;
  }

  submitDialog(): void {
    const editedProject: GetProject = {
      id: this.data.id,
      title: this.title,
      startDate: this.startDate.toISOString(),
      endDate: this.endDate.toISOString(),
      description: this.description,
    };
    this.dialogRef.close(editedProject);
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }
}
