import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/assignments/assignments.service';
import { AssignmentInterface } from '../../models/AssignmentInterface';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {

  public assignment: AssignmentInterface

  public status : string = "idle"

  constructor(
    private assignmentsService : AssignmentsService,
    private route : ActivatedRoute,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.assignmentsService.selectAssignmentEvent
      .subscribe(assignment => this.assignment = assignment);

    this.assignmentsService.fetchEvent
      .subscribe(status => this.status = status);

      //need to add error handling. What if they enter a url without a record?
    if(this.assignmentsService.getAssignment(parseInt(this.route.snapshot.params['id']))){
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
    this.assignmentsService.setAssignmentStatus("loading")
    this.assignmentsService.fetchEvent.emit("loading")
    setTimeout(
      () => this.assignmentsService.fetchAssignment(parseInt(this.route.snapshot.params['id'])).subscribe((r)=>{
        this.assignmentsService.addAssignment(r)
        this.assignment = this.assignmentsService.getAssignment(parseInt(this.route.snapshot.params['id']))
        this.assignmentsService.setAssignmentStatus("success")
        this.assignmentsService.fetchEvent.emit("success")

        console.log("fetched") 
      }), 1000)
  }

}
