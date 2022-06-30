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
    course_id: number, 
    assignment_id: number,
    assignedOn: Date,
    dueOn: Date,
    title: string,
    description: string
  }[] = []


  constructor(private assignmentsService : AssignmentsService) {
  }

  ngOnInit(): void {
    if(this.assignmentsService.initialFetch){
        this.assignmentsArray = this.assignmentsService.getAssignments()
          console.log("Didn't fetch")
      }else{
        this.getAllAssignments()
        console.log("Fetched")
      }
  }

  getAllAssignments(){
    this.assignmentsService.fetchAllAssignments().subscribe((r)=>{
      this.assignmentsService.setAssignments(r)
      this.assignmentsArray = this.assignmentsService.getAssignments()
      this.assignmentsService.initialFetch = true 
    })
  }
}
