import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AssignmentInterface } from 'src/app/models/AssignmentInterface';
import { CourseAssignmentInputInterface } from 'src/app/models/course-assignment-input-interface';
import { CourseAssignmentInterface } from 'src/app/models/CourseAssignmentInterface';
import { AssignmentsService } from 'src/app/services/assignments.service';
import { CourseAssignmentsService } from 'src/app/services/course-assignments.service';
import { CoursesService } from 'src/app/services/courses.service';
import { HttpService } from 'src/app/services/http.service';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-course-assignment-modal',
  templateUrl: './create-course-assignment-modal.component.html',
  styleUrls: ['./create-course-assignment-modal.component.css']
})
export class CreateCourseAssignmentModalComponent implements OnInit {
  @Input() assignment : AssignmentInterface = this.assignmentsService.getSelectedAssignment()
  @Input() showModal : boolean = false
  randomTestNumber = 5
  @Output() modalBtnClick = new EventEmitter()
  @Output() onAddAssignment: EventEmitter<CourseAssignmentInterface> = new EventEmitter()
  faXmark = faXmark

  coursesArray : {} = this.coursesService.getCourses()

  courseAssignmentForm = new FormGroup({
    course_id: new FormControl(null, Validators.required),
    assignment_id: new FormControl(this.assignment.id, Validators.required),
    assignedOn: new FormControl(new Date(), Validators.required),
    dueOn: new FormControl(new Date(), Validators.required)
  });

  charsRemaining:number=500

  constructor(
    private courseAssignmentsService : CourseAssignmentsService,
    private assignmentsService : AssignmentsService,
    private coursesService : CoursesService,
    private httpService : HttpService,
    private route : ActivatedRoute
  ) {
   }

  ngOnInit(): void {
    this.courseAssignmentsService.toggleModalEvent.subscribe((boolean) => console.log("hi"))
    if(this.coursesService.getCoursesStatus() === "idle"){
      this.getCourses()
    }else{
      this.coursesArray = this.coursesService.getCourses()
    }
  }

  onClick(){
    this.courseAssignmentsService.toggleModalEvent.emit(false)
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
    this.onClick()
  }

  setLength(event){
    this.charsRemaining = 500 - event.length
  }

  getCourses(){
    //this loads the spinner while it loads
    this.coursesService.setStatus("loading")
    this.coursesService.fetchEvent.emit(this.coursesService.getStatus())
    setTimeout(
      () => this.coursesService.fetchAllCourses().subscribe((r)=>{
        //set coursesArray in coursesService to r
        this.coursesService.setCourses(r)
        // setCoursesArray in this component to be the same as in the service
        this.coursesArray = this.coursesService.getCourses()
        //set status to success to stop rendering the spinner and load the component
        this.coursesService.setStatus("success")
        this.coursesService.fetchEvent.emit(this.coursesService.getStatus())
        console.log("Fetched")
      }), 1000)
  }

}
