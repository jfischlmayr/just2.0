import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

interface Project{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss']
})
export class TaskPageComponent implements OnInit {
  showDelay = new FormControl(500);
  projects: Project[] = [
    {value: 'project-1', viewValue: 'ABC'},
    {value: 'project-2', viewValue: 'QWI'},
    {value: 'project-3', viewValue: 'ASD'},
    {value: 'project-4', viewValue: 'XZY'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
