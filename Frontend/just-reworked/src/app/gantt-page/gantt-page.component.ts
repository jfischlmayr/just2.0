import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

interface Project{
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-gantt-page',
  templateUrl: './gantt-page.component.html',
  styleUrls: ['./gantt-page.component.scss']
})
export class GanttPageComponent implements OnInit {
  showDelay = new FormControl(500);
  constructor() { }
  projects: Project[] = [
    {value: 'project-1', viewValue: 'ABC'},
    {value: 'project-2', viewValue: 'QWI'},
    {value: 'project-3', viewValue: 'ASD'},
    {value: 'project-4', viewValue: 'XZY'}
  ];
  ngOnInit(): void {
  }

}
