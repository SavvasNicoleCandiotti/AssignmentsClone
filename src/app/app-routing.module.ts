import { identifierName } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { CourseAssignmentDetailComponent } from './course-assignments/course-assignment-detail/course-assignment-detail.component';
import { CourseAssignmentsComponent } from './course-assignments/course-assignments.component';
import { HomeComponent } from './home/home.component';
import { ProgramDetailComponent } from './programs/program-detail/program-detail.component';
import { ProgramsComponent } from './programs/programs.component';

const routes: Routes = [
  {
    path: 'programs',
    children: [
      {
        path: ':id',
        children: [
          { path: '', component: ProgramDetailComponent },
          {
            path: 'course_assignments',
            children: [
              { path: ':id', component: CourseAssignmentDetailComponent },
              { path: '', component: CourseAssignmentsComponent },
            ],
          },
        ],
      },
      { path: '', component: ProgramsComponent },
    ],
  },
  {
    path: 'courses',
    children: [
      {
        path: ':id',
        children: [
          {
            path: 'course_assignments',
            children: [
              { path: ':id', component: CourseAssignmentDetailComponent },
              { path: '', component: CourseAssignmentsComponent },
            ],
          },
        ],
      },
      { path: '', component: ProgramsComponent },
    ],
  },
  { path: 'assignments', component: AssignmentsComponent },
  { path: 'assignments/:id', component: AssignmentDetailComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
