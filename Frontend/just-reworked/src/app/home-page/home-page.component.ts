import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  showDelay = new FormControl(500);
  constructor() { }

  ngOnInit(): void {
  }

}
