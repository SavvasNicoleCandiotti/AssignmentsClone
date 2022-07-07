import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseAssignmentsService } from '../../services/course-assignments.service';
import { CourseAssignmentInterface } from '../../models/CourseAssignmentInterface';

@Component({
  selector: 'app-course-assignment',
  templateUrl: './course-assignment.component.html',
  styleUrls: ['./course-assignment.component.css']
})
export class CourseAssignmentComponent implements OnInit {
  @Input() courseAssignment : CourseAssignmentInterface

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
