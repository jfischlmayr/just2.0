import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GanttPageComponent } from './gantt-page/gantt-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { TaskPageComponent } from './task-page/task-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { OldGanttComponent } from './old-gantt/old-gantt.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import { EditDialogComponent } from './project-page/edit-dialog/edit-dialog.component';
import { EditTaskDialogComponent } from './task-page/edit-task-dialog/edit-task-dialog.component';
import { TestingComponent } from './testing/testing.component';


@NgModule({
  declarations: [
    AppComponent,
    GanttPageComponent,
    HomePageComponent,
    ProjectPageComponent,
    TaskPageComponent,
    OldGanttComponent,
    TutorialComponent,
    EditDialogComponent,
    EditTaskDialogComponent,
    TestingComponent
  ],
  entryComponents:[
    EditDialogComponent,
    EditTaskDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatDividerModule,
    MatListModule,
    MatProgressBarModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  providers: [ {
    provide: MAT_DATE_LOCALE, useValue: 'de-DE'
  }
  ],
  bootstrap: [AppComponent, HomePageComponent]
})
export class AppModule { }
