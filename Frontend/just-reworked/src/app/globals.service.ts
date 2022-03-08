import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  private selectedProject: number = 0

  constructor() { }
  getPjId() : number{
    return this.selectedProject
  }

  setPjId(_id : number) : void{
    this.selectedProject = _id
  }
}
