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
  @Input() assignmentsArray
  @Input() assignment : Assignment
  constructor(
    private assignmentsService : AssignmentsService,
    private router : Router,
    private route : ActivatedRoute
  ) {
   }

  ngOnInit(): void {
    
  }

  selectAssignment = () => {
    this.assignmentsService.selectAssignmentEvent.emit(this.assignmentsArray)
    this.router.navigate([this.assignmentsArray.id], {relativeTo: this.route})
  }
}
