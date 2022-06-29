import { Component, OnInit, Output } from '@angular/core';
import { AssignmentsService } from './assignments.service';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  @Output() assignments : Assignment[];

  constructor(private assignmentsService : AssignmentsService) { }

  ngOnInit(): void {
    this.assignments = this.assignmentsService.getAssignments()
  }

}
