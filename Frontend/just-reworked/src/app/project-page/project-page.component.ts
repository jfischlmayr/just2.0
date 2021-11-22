import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';






@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {



  showDelay = new FormControl(500);

  public projectName : string = 'hurensohn'

  constructor() { }

  ngOnInit(): void {
  }


  onSubmit(){

  }

}
