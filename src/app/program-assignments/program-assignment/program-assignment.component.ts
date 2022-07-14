import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/services/assignments.service';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { AssignmentInterface } from 'src/app/models/AssignmentInterface';

@Component({
  selector: 'app-program-assignment',
  templateUrl: './program-assignment.component.html',
  styleUrls: ['./program-assignment.component.css']
})
export class ProgramAssignmentComponent implements OnInit {
  faChevronRight=faChevronRight
  @Input() programAssignment : AssignmentInterface

  constructor(
  ) {
   }

  ngOnInit(): void {
  }
}
