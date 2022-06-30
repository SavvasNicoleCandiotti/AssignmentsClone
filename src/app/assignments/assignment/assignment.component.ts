import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/assignments/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {
  @Input() assignment : {
    id: number, 
    course_id: number, 
    assignment_id: number,
    assignedOn: Date,
    dueOn: Date,
    title: string,
    description: string
  }

  constructor(
    private assignmentsService : AssignmentsService,
    private router : Router,
    private route : ActivatedRoute
  ) {
   }

  ngOnInit(): void {
  }

  selectAssignment = () => {
    this.assignmentsService.selectAssignmentEvent.emit(this.assignment)
    this.router.navigate([this.assignment.id], {relativeTo: this.route})
  }
}
