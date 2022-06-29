import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/assignments/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {

  public assignment: Assignment

  constructor(
    private assignmentsService : AssignmentsService,
    private route : ActivatedRoute,
    private router : Router) {
    this.assignmentsService.selectAssignmentEvent
      .subscribe(assignment => this.assignment = assignment);
    
   }

  ngOnInit(): void {
    this.assignment = this.assignmentsService.getAssignment(
      parseInt(this.route.snapshot.params['id'])
    )
  }

  navigateToAssignments = () => this.router.navigate(['assignments'])

  navigateHome = () => this.router.navigate(['/'])
}
