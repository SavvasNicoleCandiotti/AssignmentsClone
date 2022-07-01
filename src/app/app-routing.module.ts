import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { CourseAssignmentDetailComponent } from './course-assignments/course-assignment-detail/course-assignment-detail.component';
import { CourseAssignmentsComponent } from './course-assignments/course-assignments.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: 'course-assignments', component: CourseAssignmentsComponent},
  {path: 'course-assignments/:id', component: CourseAssignmentDetailComponent},
  {path: 'assignments', component: AssignmentsComponent},
  {path: 'assignments/:id', component: AssignmentDetailComponent},
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
