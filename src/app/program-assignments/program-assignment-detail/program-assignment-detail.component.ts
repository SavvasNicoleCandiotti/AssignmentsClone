import { Component, OnInit, Input } from '@angular/core';
import { AssignmentsService } from 'src/app/assignments/assignments.service';

@Component({
  selector: 'app-program-assignment-detail',
  templateUrl: './program-assignment-detail.component.html',
  styleUrls: ['./program-assignment-detail.component.css']
})
export class ProgramAssignmentDetailComponent implements OnInit {

  @Input() programAssignment : {
    id: number, 
    title: string,
    description: string,
    program_id: number
  }

  constructor(private assignmentsService: AssignmentsService) { }

  ngOnInit(): void {
    this.assignmentsService.selectProgramAssignmentEvent.subscribe(programAssignment => this.programAssignment = programAssignment)
  }


}
