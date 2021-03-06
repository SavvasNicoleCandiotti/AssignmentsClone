import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignmentsService } from '../services/assignments.service';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { AssignmentInterface } from '../models/AssignmentInterface';

@Component({
  selector: 'app-program-assignments',
  templateUrl: './program-assignments.component.html',
  styleUrls: ['./program-assignments.component.css']
})
export class ProgramAssignmentsComponent implements OnInit {
  faEllipsisVertical=faEllipsisVertical
  programAssignmentsArray : AssignmentInterface[]

  public status : string = "idle"
  public program_id: number = +this.route.snapshot.params['id']

  constructor(
    private assignmentsService : AssignmentsService,
    private route : ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.assignmentsService.fetchEvent
      .subscribe(status => this.status = status);

    this.assignmentsService.postEvent.subscribe(() => {
      this.programAssignmentsArray = this.assignmentsService.filterAssignmentsByProgram(
      this.program_id)
      console.log("Didn't fetch")
    })

    this.status = this.assignmentsService.getStatus()
    if(this.status === "success"){
        this.programAssignmentsArray = this.assignmentsService.filterAssignmentsByProgram(
          +this.route.snapshot.params['id'])
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
          +this.route.snapshot.params['id']
        )
        this.assignmentsService.setStatus("success")
        this.assignmentsService.fetchEvent.emit("success")
        console.log("Fetched")
      }), 1000)
  }

  toggleModal(){
    this.assignmentsService.toggleCreateAssignmentModalEvent.emit(true)
  }
}
