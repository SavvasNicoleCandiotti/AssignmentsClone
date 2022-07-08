import { Component, OnInit, Input } from '@angular/core';
import { AssignmentInterface } from 'src/app/models/AssignmentInterface';
import { AssignmentsService } from 'src/app/services/assignments.service';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { CourseAssignmentsService } from 'src/app/services/course-assignments.service';

@Component({
  selector: 'app-program-assignment-detail',
  templateUrl: './program-assignment-detail.component.html',
  styleUrls: ['./program-assignment-detail.component.css']
})
export class ProgramAssignmentDetailComponent implements OnInit {
  faEllipsisVertical=faEllipsisVertical


  @Input() programAssignment : AssignmentInterface

  constructor(
    private assignmentsService: AssignmentsService,
    private courseAssignmentsService : CourseAssignmentsService
  ) { }

  ngOnInit(): void {
    this.assignmentsService.selectProgramAssignmentEvent
    .subscribe(programAssignment => this.programAssignment = programAssignment)
  }

  openCreateCourseAssignmentModal(){
    this.courseAssignmentsService.toggleModalEvent.emit(true) 
  }

  closeModal(){
    this.courseAssignmentsService.toggleModalEvent.emit(false) 
  }

}
