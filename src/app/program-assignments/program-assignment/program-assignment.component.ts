import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/services/assignments.service';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-program-assignment',
  templateUrl: './program-assignment.component.html',
  styleUrls: ['./program-assignment.component.css']
})
export class ProgramAssignmentComponent implements OnInit {
  faChevronRight=faChevronRight
  @Input() programAssignment : {
    id: number,
    title: string,
    description: string,
    program_id: number
  }
  @Output() showProgramCard = new EventEmitter()

  constructor(
    private assignmentsService: AssignmentsService
  ) {
   }

  ngOnInit(): void {
  }

  selectAssignment = () => {
    console.log("program assignment clicked")
    this.assignmentsService.selectProgramAssignmentEvent.emit(this.programAssignment)
    this.showProgramCard.emit()
  }
}
