import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss']
})
export class TaskPageComponent implements OnInit {
  showDelay = new FormControl(500);
  constructor() { }

  ngOnInit(): void {
  }

}
