import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';



  projectName: string;
  date : string;

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {




  showDelay = new FormControl(500);

  constructor() {
    projectName ="";
    this.date="";

   }

  ngOnInit(): void {
  }


  onSubmit(){
    console.log.(projectName);
    console.log(this.date);
  }

}
