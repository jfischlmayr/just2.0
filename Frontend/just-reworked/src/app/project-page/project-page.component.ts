import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

interface Project {
  title: string
  startDate: Date
  endDate: Date
}

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {
  showDelay = new FormControl(500);

  title : string = ''
  startDate: Date = new Date()
  endDate: Date = new Date()

  projects!: Observable<Project[]>

  constructor(private httpClient : HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.projects = this.httpClient.get<Project[]>('https://localhost:5001/api/project')
  }

  onSubmit(){
    const project: Project = {
      title: this.title,
      startDate: this.startDate,
      endDate: this.endDate
    }

    this.httpClient.post('https://localhost:5001/api/project', project).subscribe(() => this.router.navigate(['projects']))
  }

  editProject(p: Project){

  }

  deleteProject(p: Project){
    this.httpClient.delete('https://localhost:5001/api/project')
  }
}
