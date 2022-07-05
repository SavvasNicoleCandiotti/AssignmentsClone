import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseAssignmentsService } from '../course-assignments.service';

@Component({
  selector: 'app-course-assignment',
  templateUrl: './course-assignment.component.html',
  styleUrls: ['./course-assignment.component.css']
})
export class CourseAssignmentComponent implements OnInit {
  @Input() courseAssignment : {
    id: number, 
    course_id: number, 
    assignment_id: number,
    assignedOn: Date,
    dueOn: Date,
    title: string,
    description: string,
    program_id: number
  }

  constructor(
    private courseAssignmentsService : CourseAssignmentsService,
    private router : Router,
    private route : ActivatedRoute
  ) {
   }

  ngOnInit(): void {
  }

  selectCourseAssignment = () => {
    this.courseAssignmentsService.selectCourseAssignmentEvent.emit(this.courseAssignment)
    this.router.navigate([this.courseAssignment.id], {relativeTo: this.route})
  }

}
