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

  public assignment: {
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
    private route : ActivatedRoute,
    private router : Router
  ) {
    this.assignmentsService.selectAssignmentEvent
      .subscribe(assignment => this.assignment = assignment);

   }

  ngOnInit(): void {
    if(this.assignmentsService.getAssignment(
      parseInt(this.route.snapshot.params['id']))){
        this.assignment = this.assignmentsService.getAssignment(
          parseInt(this.route.snapshot.params['id']))
          console.log("Didn't fetch")
      }else{
        this.getFetchedAssignment()
      }
    this.assignment = this.assignmentsService.getAssignment(
      parseInt(this.route.snapshot.params['id'])
    )
  }

  navigateToAssignments = () => this.router.navigate(['assignments'])

  navigateHome = () => this.router.navigate(['/'])

  getFetchedAssignment(){
    this.assignmentsService.fetchAssignment(parseInt(this.route.snapshot.params['id'])).subscribe((r)=>{
      this.assignmentsService.addAssignment(r)
      this.assignment = this.assignmentsService.getAssignment(parseInt(this.route.snapshot.params['id']))
      console.log("fetched") 
    })
  }

}
