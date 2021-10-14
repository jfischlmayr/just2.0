import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-gantt-page',
  templateUrl: './gantt-page.component.html',
  styleUrls: ['./gantt-page.component.scss']
})
export class GanttPageComponent implements OnInit {
  showDelay = new FormControl(500);
  constructor() { }

  ngOnInit(): void {
  }

}
