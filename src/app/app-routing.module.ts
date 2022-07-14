import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseAssignmentDetailComponent } from './course-assignments/course-assignment-detail/course-assignment-detail.component';
import { CourseAssignmentsComponent } from './course-assignments/course-assignments.component';
import { HomeComponent } from './home/home.component';
import { ProgramAssignmentDetailComponent } from './program-assignments/program-assignment-detail/program-assignment-detail.component';
import { ProgramAssignmentsComponent } from './program-assignments/program-assignments.component';
import { ProgramDetailComponent } from './programs/program-detail/program-detail.component';
import { ProgramsComponent } from './programs/programs.component';

const routes: Routes = [
  {
    path: "programs",
    children: [
      { path: "", component: ProgramsComponent },
      { path: ":id", component: ProgramDetailComponent,
        children: [
          { path: "assignments/:id",  component: ProgramAssignmentDetailComponent },
        ]
      }
    ]
  },
  {
    path: "courses",
    children: [
      {
        path: ":id", 
        children: [
          {
            path: "course_assignments", 
            children: [
              {path: ":id", component: CourseAssignmentDetailComponent},
              {path: '', component: CourseAssignmentsComponent}
            ]}
        ]
      },
      {path: "", component: ProgramsComponent}
    ]
  },
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
