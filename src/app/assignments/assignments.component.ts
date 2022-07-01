import { Component, OnInit, Output } from '@angular/core';
import { AssignmentsService } from './assignments.service';
import { Assignment } from './assignment.model';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  assignmentsArray:{
    id: number, 
    title: string,
    description: string
  }[] = []

  public status : string = "idle"

  constructor(private assignmentsService : AssignmentsService) {
  }

  ngOnInit(): void {

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

    setTimeout(
      () => this.assignmentsService.fetchAllAssignments().subscribe((r)=>{
        this.assignmentsService.setAssignments(r)
        this.assignmentsArray = this.assignmentsService.getAssignments()
        this.assignmentsService.setStatus("success")
        this.assignmentsService.fetchEvent.emit("success")
        console.log("Fetched")
      }), 1000) 
  }
}
