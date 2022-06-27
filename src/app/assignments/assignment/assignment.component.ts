import { Component, Input, OnInit } from '@angular/core';
import { AssignmentsService } from 'src/app/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {

  @Input() assignment : Assignment
  constructor(private assignmentsService : AssignmentsService) {
   }

  ngOnInit(): void {
    
  }

}
