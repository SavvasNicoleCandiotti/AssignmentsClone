import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignmentsService } from '../assignments/assignments.service';

@Component({
  selector: 'app-program-assignments',
  templateUrl: './program-assignments.component.html',
  styleUrls: ['./program-assignments.component.css']
})
export class ProgramAssignmentsComponent implements OnInit {

  programAssignmentsArray : {}[]

  public status : string = "idle"

  constructor(
    private assignmentsService : AssignmentsService,
    private route : ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.assignmentsService.fetchEvent
      .subscribe(status => this.status = status);

    this.status = this.assignmentsService.getStatus()
    if(this.status === "success"){
        this.programAssignmentsArray = this.assignmentsService.filterAssignmentsByProgram(
          parseInt(this.route.snapshot.params['id']))
          console.log(this.programAssignmentsArray)
          console.log("Didn't fetch")
      }else if(this.status === "idle"){
        this.getAllProgramAssignments()

      }
  }

  getAllProgramAssignments(){
    this.assignmentsService.setStatus("loading")
    this.assignmentsService.fetchEvent.emit("loading")

    setTimeout(
      () => this.assignmentsService.getAssignmentsTest().subscribe((r)=>{
        this.assignmentsService.setAssignments(r)
        this.programAssignmentsArray = this.assignmentsService.filterAssignmentsByProgram(
          parseInt(this.route.snapshot.params['id'])
        )
        this.assignmentsService.setStatus("success")
        this.assignmentsService.fetchEvent.emit("success")
        console.log("Fetched")
      }), 1000)
  }

}
