import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { GetProject, Project } from '../model';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
})
export class ProjectPageComponent implements OnInit {
  showDelay = new FormControl(500);

  title : string = ''
  startDate!: Date
  endDate!: Date
  description: string =''
  selectedIndex: number = 0;

  editing: boolean = false;
  projectToEdit?: GetProject;

  projects?: GetProject[];

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.httpClient
      .get<GetProject[]>('https://localhost:5001/api/project')
      .subscribe((result) => {
        this.projects = result;
      });
  }

  onSubmit() {
    const project: Project = {
      title: this.title,
      startDate: this.startDate,
      endDate: this.endDate,
      description: this.description,
    };
    console.log(project);
    this.httpClient
      .post('https://localhost:5001/api/project', project)
      .subscribe(() => this.refresh());

    this.title = '';
    this.startDate = new Date();
    this.endDate = new Date();
    this.description = '';
  }

  deleteProject(id: number) {
    this.httpClient
      .delete(`https://localhost:5001/api/project?id=${id}`)
      .subscribe(() => this.refresh());
  }

  editProject(p: GetProject): void {
    const dialogRef = this.dialog
      .open(EditDialogComponent, {
        data: p,
        panelClass: 'custom-dialog-container',
      })
      .afterClosed()
      .subscribe((result) => {
        this.projectToEdit = result;

        this.httpClient
          .put('https://localhost:5001/api/project', this.projectToEdit)
          .subscribe(() => this.refresh());
      });
  }

  displayDate(p: GetProject): string {
    const sDate = p.startDate;
    const eDate = p.endDate;
    return `${p.startDate.toString().substring(0, 10)} bis ${p.endDate
      .toString()
      .substring(0, 10)}`;
  }

  setRow(_idx : number){
    this.selectedIndex = _idx
  }
}
