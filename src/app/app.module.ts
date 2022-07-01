import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AssignmentComponent } from './assignments/assignment/assignment.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './courses/course/course.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { HomeComponent } from './home/home.component';
import { CourseAssignmentsComponent } from './course-assignments/course-assignments.component';
import { CourseAssignmentComponent } from './course-assignments/course-assignment/course-assignment.component';
import { CourseAssignmentDetailComponent } from './course-assignments/course-assignment-detail/course-assignment-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    AssignmentComponent,
    CoursesComponent,
    CourseComponent,
    NavbarComponent,
    AssignmentDetailComponent,
    HomeComponent,
    CourseAssignmentsComponent,
    CourseAssignmentComponent,
    CourseAssignmentDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
