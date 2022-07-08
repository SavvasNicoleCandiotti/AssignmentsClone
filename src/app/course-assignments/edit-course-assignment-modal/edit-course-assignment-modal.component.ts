import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CourseAssignmentsService } from 'src/app/services/course-assignments.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit-course-assignment-modal',
  templateUrl: './edit-course-assignment-modal.component.html',
  styleUrls: ['./edit-course-assignment-modal.component.css']
})
export class EditCourseAssignmentModalComponent implements OnInit {
  @Input() courseAssignment = this.courseAssignmentsService.getCourseAssignment(parseInt(this.route.snapshot.params['id']))
  @Output() closeEditModal = new EventEmitter()
  faXmark=faXmark
  editForm = new FormGroup ({
    id: new FormControl(this.courseAssignment.id),
    assignedOn: new FormControl(this.courseAssignment.assignedOn),
    dueOn: new FormControl(this.courseAssignment.dueOn),
  })

  constructor(private courseAssignmentsService: CourseAssignmentsService,
    private route: ActivatedRoute,
    private router : Router) { }

  ngOnInit(): void {

  }
  handleCloseEditModal(){
    this.closeEditModal.emit()
  }
  submitEditForm(value){
    this.courseAssignmentsService.patchAssignment(value).subscribe(assignment => {
      this.courseAssignmentsService.updateCourseAssignment(assignment)

      //the event needs to be emitted inside this code block, it doesn't work below it
      this.courseAssignmentsService.updateEvent.emit()
    });
    // reset values once form is submitted
    this.editForm.reset()
    // closes modal once form is submitted
    this.closeEditModal.emit()

  }

  handleDelete(assignment){
    console.log(assignment)
    this.courseAssignmentsService.deleteAssignment(assignment).subscribe(assignment =>{
      this.courseAssignmentsService.removeAssignmentFromArray(assignment)
    }) //and then filter it out here by subscribing to service event to be  created
    alert(`successfully deleted ${assignment.title} for ${assignment.course_name}`)
     this.router.navigate([''])
  }

}
