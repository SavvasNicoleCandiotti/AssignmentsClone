import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseAssignmentsService } from '../../services/course-assignments.service';
import { CourseAssignmentInterface } from '../../models/CourseAssignmentInterface';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-assignment',
  templateUrl: './course-assignment.component.html',
  styleUrls: ['./course-assignment.component.css'],
})
export class CourseAssignmentComponent implements OnInit {
  @Input() courseAssignment: CourseAssignmentInterface;
  faEllipsisVertical = faEllipsisVertical;
  iconNumber: number = this.randomNumber();

  constructor(
    private courseAssignmentsService: CourseAssignmentsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}
  randomNumber(): number {
    return Math.floor(Math.random() * 8) + 1;
  }

  selectCourseAssignment = () => {
    this.courseAssignmentsService.selectCourseAssignmentEvent.emit(
      this.courseAssignment
    );
    this.router.navigate([this.courseAssignment.id], {
      relativeTo: this.route,
    });
  };
}
