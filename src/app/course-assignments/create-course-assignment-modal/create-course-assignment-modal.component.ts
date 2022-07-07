import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AssignmentInterface } from 'src/app/models/AssignmentInterface';
import { CourseAssignmentInputInterface } from 'src/app/models/course-assignment-input-interface';
import { CourseAssignmentInterface } from 'src/app/models/CourseAssignmentInterface';
import { CourseAssignmentsService } from 'src/app/services/course-assignments.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-create-course-assignment-modal',
  templateUrl: './create-course-assignment-modal.component.html',
  styleUrls: ['./create-course-assignment-modal.component.css']
})
export class CreateCourseAssignmentModalComponent implements OnInit {
  @Input() assignment : AssignmentInterface = {}
  @Input() showModal:boolean
  randomTestNumber = 5
  @Output() modalBtnClick = new EventEmitter()
  @Output() onAddAssignment: EventEmitter<CourseAssignmentInterface> = new EventEmitter()

  courseAssignmentForm = new FormGroup({
    course_id: new FormControl(null, Validators.required),
    assignment_id: new FormControl(this.assignment.id, Validators.required),
    assignedOn: new FormControl(Date, Validators.required),
    dueOn: new FormControl(Date, Validators.required)
  });

  charsRemaining:number=500

  constructor(
    private courseAssignmentsService : CourseAssignmentsService,
    private httpService : HttpService, 
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  onClick(){
    this.modalBtnClick.emit()
  }

  submitModalForm(value : CourseAssignmentInputInterface ){
    // this neeeds to take in an assignment
    // this.onAddAssignment.emit(value)
    this.courseAssignmentsService.postAssignment(value)
    .subscribe((courseAssignment : CourseAssignmentInterface) => {
      this.courseAssignmentsService.addCourseAssignment(courseAssignment)
      //the event needs to be emitted inside this code block, it doesn't work below it
      this.httpService.postEvent.emit()
    });

    // reset values once form is submitted - is there a reset method on forms?
    this.courseAssignmentForm.reset()

    // closes modal once form is submitted
     this.modalBtnClick.emit()
  }

  setLength(event){
    this.charsRemaining = 500 - event.length}

}
