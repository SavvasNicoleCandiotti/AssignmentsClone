import { Component, OnInit, Output } from '@angular/core';
import { AssignmentsService } from './assignments.service';
import { AssignmentInterface } from './AssignmentInterface';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  assignmentsArray:AssignmentInterface[] = []

  public status : string = "idle"

  constructor(private assignmentsService : AssignmentsService) {
  }

  ngOnInit(): void {
    //this shows all assignments including assignments newly added to the array but messes up the spinner
    this.assignmentsService.getAssignmentsTest().subscribe(r=>this.assignmentsArray = r)

    this.assignmentsService.fetchEvent
      .subscribe(status => this.status = status);

    this.status = this.assignmentsService.getStatus()
    if(this.status === "success"){
        this.assignmentsArray = this.assignmentsService.getAssignments()
          console.log("Didn't fetch")
      }else if(this.status === "idle"){
        this.getAllAssignments()
      }
  }

  getAllAssignments(){
    this.assignmentsService.setStatus("loading")
    this.assignmentsService.fetchEvent.emit("loading")

    // for the spinner
    setTimeout(
      () =>  this.assignmentsService.getAssignmentsTest().subscribe(r=> {
      this.assignmentsService.setAssignments(r)
      this.assignmentsArray = this.assignmentsService.getAssignments()
      this.assignmentsService.setStatus("success")
      this.assignmentsService.fetchEvent.emit("success")
      console.log("r", r)
      console.log(this.assignmentsArray)
    }), 1000)

  }
      // posting assignment from createAssignmentModalComponent
    addAssignment(assignment: AssignmentInterface){
      this.assignmentsService.setStatus("loading")
      this.assignmentsService.fetchEvent.emit("loading")
      // this posts assignment
      this.assignmentsService.postAssignment(assignment).subscribe(assignment => {
        //adds assignment in service
      this.assignmentsService.addAssignment(assignment)
        //sets local
      this.assignmentsArray = this.assignmentsService.getAssignments()
      this.assignmentsService.setStatus("success")
      this.assignmentsService.fetchEvent.emit("success")
      })
  }

}
