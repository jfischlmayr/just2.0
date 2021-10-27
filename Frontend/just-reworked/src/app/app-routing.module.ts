import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { GanttPageComponent } from './gantt-page/gantt-page.component';
import { TaskPageComponent } from './task-page/task-page.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { OldGanttComponent } from './old-gantt/old-gantt.component';


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'gantt', component: GanttPageComponent},
  {path: 'tasks', component: TaskPageComponent},
  {path: 'projects', component: ProjectPageComponent},
  {path: 'oldGantt', component: OldGanttComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
