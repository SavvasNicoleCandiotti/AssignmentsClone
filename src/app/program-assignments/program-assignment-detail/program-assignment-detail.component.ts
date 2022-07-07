import { Component, OnInit, Input } from '@angular/core';
import { AssignmentInterface } from 'src/app/models/AssignmentInterface';
import { AssignmentsService } from 'src/app/services/assignments.service';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-program-assignment-detail',
  templateUrl: './program-assignment-detail.component.html',
  styleUrls: ['./program-assignment-detail.component.css']
})
export class ProgramAssignmentDetailComponent implements OnInit {
  faEllipsisVertical=faEllipsisVertical

  @Input() programAssignment : AssignmentInterface

  constructor(private assignmentsService: AssignmentsService) { }

  ngOnInit(): void {
    this.assignmentsService.selectProgramAssignmentEvent.subscribe(programAssignment => this.programAssignment = programAssignment)
  }

  handleClick(){
    console.log("assign button clicked")
  }

}
