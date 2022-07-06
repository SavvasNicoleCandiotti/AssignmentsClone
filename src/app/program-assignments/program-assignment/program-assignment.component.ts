import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/assignments/assignments.service';

@Component({
  selector: 'app-program-assignment',
  templateUrl: './program-assignment.component.html',
  styleUrls: ['./program-assignment.component.css']
})
export class ProgramAssignmentComponent implements OnInit {

  @Input() programAssignment : {
    id: number, 
    title: string,
    description: string,
    program_id: number
  }

  constructor(
    private assignmentsService : AssignmentsService
  ) {
   }

  ngOnInit(): void {
  }

  selectAssignment = () => this.assignmentsService.selectProgramAssignmentEvent.emit(this.programAssignment)
}
