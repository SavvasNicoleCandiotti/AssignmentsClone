import { Component, OnInit } from '@angular/core';
import { AssignmentInterface } from '../models/AssignmentInterface';
import { BehaviorSubject } from 'rxjs';
import { AssignmentsService } from '../services/assignments.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  assignmentsArray:AssignmentInterface[] = []
  assignmentsSubject = new BehaviorSubject<AssignmentInterface[]>([])

  public status : string = "idle"

  constructor(private assignmentsService : AssignmentsService) {
  }

  ngOnInit(): void {
    // NC messing w subject/observables/multicasting --------------
    // this.assignmentsService.getAssignmentsTest().subscribe(r=> {
    //   //sets local
    //   this.assignmentsSubject.next(r)
    //   //sets in service
    //   this.assignmentsService.setSubjectData(r)
    // })
    //working for now -------------------------------------------

    //this shows all assignments including assignments newly added to the array but messes up the spinner
    // this.assignmentsService.getAssignmentsTest().subscribe(r=>this.assignmentsArray = r)

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
      this.assignmentsSubject.next(this.assignmentsArray)
      console.log("behavior subject value", this.assignmentsSubject.value)

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
      this.assignmentsSubject.next(this.assignmentsArray)
      this.assignmentsService.setStatus("success")
      this.assignmentsService.fetchEvent.emit("success")
      })
  }

}
