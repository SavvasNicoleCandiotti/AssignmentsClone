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
  @Input() assignment : AssignmentInterface
  @Input() showModal:boolean
  randomTestNumber = 5
  @Output() modalBtnClick = new EventEmitter()
  @Output() onAddAssignment: EventEmitter<CourseAssignmentInterface> = new EventEmitter()

  courseAssignmentForm = new FormGroup({
    title: new FormControl(this.assignment.title, Validators.required),
    description: new FormControl(this.assignment.description, [Validators.required, Validators.maxLength(500)]),
    // does this have to be a form control since there's no user input? doesn't seem to work w/o form control
    assignment_id: new FormControl(this.assignment.id, Validators.required),
    assignedOn: new FormControl("", Validators.required),
    dueOn: new FormControl("", Validators.required),
    program_id: new FormControl(this.assignment.program_id, Validators.required)
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
    .subscribe((courseAssignment : CourseAssignmentInputInterface) => {
      this.courseAssignmentsService.addCourseAssignment(courseAssignment)
      //the event needs to be emitted inside this code block, it doesn't work below it
      this.httpService.postEvent.emit()
    });

    // reset values once form is submitted - is there a reset method on forms?
    this.courseAssignmentForm.reset()

    // closes modal once form is submitted
     this.modalBtnClick.emit()
  }

}
