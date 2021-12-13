import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';


interface GetProject {
  id: number
  title: string
  startDate: Date
  endDate: Date
  description: string
}

interface Project {
  title: string
  startDate: Date
  endDate: Date
  description: string
}

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {
  showDelay = new FormControl(500);

  title : string = ''
  startDate!: Date
  endDate!: Date
  description: string =''

  editing: boolean = false
  projectToEdit?: GetProject

  projects?: GetProject[]

  constructor(private httpClient : HttpClient, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.refresh()
  }

  refresh() {
    this.httpClient.get<GetProject[]>('https://localhost:5001/api/project').subscribe(result => {
      this.projects = result
    })
  }

  onSubmit(){
    const project: Project = {
      title: this.title,
      startDate: this.startDate,
      endDate: this.endDate,
      description: this.description
    }

    if(this.editing) {
      this.editing = false

      this.projectToEdit!.title = this.title
      this.projectToEdit!.startDate = this.startDate
      this.projectToEdit!.endDate = this.endDate

      this.httpClient.put('https://localhost:5001/api/project', this.projectToEdit).subscribe(() => this.refresh())
    } else {
      this.httpClient.post('https://localhost:5001/api/project', project).subscribe(() => this.refresh())
    }

    this.title = ''
    this.startDate = new Date()
    this.endDate = new Date()
    this.description = ''
  }

  // editProject(p : GetProject){
  //   this.title = p.title
  //   this.startDate = p.startDate
  //   this.endDate = p.endDate
  //   this.editing = true
  //   this.projectToEdit = p
  // }

  deleteProject(id: number){
    this.httpClient.delete(`https://localhost:5001/api/project?id=${id}`).subscribe(() => this.refresh())
  }

  editProject(p : GetProject) : void{
    const dialogRef = this.dialog.open(EditDialogComponent,{
      data:p,
      panelClass: 'custom-dialog-container'
    })
    .afterClosed().subscribe( result => {
      var idx = this.projects?.findIndex(p => p.id == result.id) || -1;
      var tempProj : GetProject = result

      if(idx != -1) this.projects![idx] = tempProj;
    })
  }
}
