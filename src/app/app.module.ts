import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


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
import { HomeCourseCardComponent } from './home/home-course-card/home-course-card.component';
import { ProgramsComponent } from './programs/programs.component';
import { ProgramComponent } from './programs/program/program.component';
import { ProgramDetailComponent } from './programs/program-detail/program-detail.component';
import { CourseProgramsComponent } from './course-programs/course-programs.component';
import { CourseAssignmentDetailsComponent } from './home/course-assignment-details/course-assignment-details.component';
import { CreateAssignmentModalComponent } from './assignments/create-assignment-modal/create-assignment-modal.component';
import { ProgramAssignmentsComponent } from './program-assignments/program-assignments.component';
import { ProgramAssignmentComponent } from './program-assignments/program-assignment/program-assignment.component';
import { ProgramAssignmentDetailComponent } from './program-assignments/program-assignment-detail/program-assignment-detail.component';
import { EditCourseAssignmentModalComponent } from './course-assignments/edit-course-assignment-modal/edit-course-assignment-modal.component';
import { CreateCourseAssignmentModalComponent } from './course-assignments/create-course-assignment-modal/create-course-assignment-modal.component';
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
    CourseAssignmentDetailComponent,
    HomeCourseCardComponent,
    ProgramsComponent,
    ProgramComponent,
    ProgramDetailComponent,
    CourseProgramsComponent,
    CourseAssignmentDetailsComponent,
    CreateAssignmentModalComponent,
    ProgramAssignmentsComponent,
    ProgramAssignmentComponent,
    ProgramAssignmentDetailComponent,
    EditCourseAssignmentModalComponent, 
    CreateCourseAssignmentModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, ReactiveFormsModule, FontAwesomeModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }