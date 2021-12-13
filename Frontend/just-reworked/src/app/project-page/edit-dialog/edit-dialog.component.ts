import { Component, OnInit, Inject } from '@angular/core';
import { MatDatepickerContent } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface GetProject {
  id: number
  title: string
  startDate: Date
  endDate: Date
  description: string
}

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  title : string = ''
  startDate!: Date
  endDate!: Date
  description: string =''

  constructor(@Inject(MAT_DIALOG_DATA) public data: GetProject, private dialogRef : MatDialogRef<EditDialogComponent>) { }

  ngOnInit(): void {
    this.title = this.data.title
    this.startDate = this.data.startDate
    this.endDate = this.data.endDate
    this.description = this.data.description
  }

  submitDialog() : void{
    const editedProject: GetProject = {id: this.data.id , title : this.title, startDate : this.startDate, endDate : this.endDate, description: this.description}
    this.dialogRef.close(editedProject)
  }

  cancelDialog() : void{
    this.dialogRef.close()
  }

}
