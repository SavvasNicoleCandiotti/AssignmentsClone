import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-course-assignment-modal',
  templateUrl: './edit-course-assignment-modal.component.html',
  styleUrls: ['./edit-course-assignment-modal.component.css']
})
export class EditCourseAssignmentModalComponent implements OnInit {
  @Input() courseAssignment
  @Output() closeEditModal = new EventEmitter()
  faXmark=faXmark
  editForm = new FormGroup ({
    title: new FormControl(''),
    description: new FormControl(''),
    assignedOn: new FormControl(''),
    dueOn: new FormControl(''),
  })

  constructor() { }

  ngOnInit(): void {

  }
  handleCloseEditModal(){
    this.closeEditModal.emit()
  }


}
