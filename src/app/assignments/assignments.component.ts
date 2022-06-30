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
  assignmentsArray:{}=[]
  @Output() assignments : Assignment[];


  constructor(private assignmentsService : AssignmentsService) {
    this.getAllAssignments()
   }
getAllAssignments(){
  this.assignmentsService.fetchAllAssignments().subscribe((r)=>{
    console.log(r)
    this.assignmentsArray = r 

  })
}
  ngOnInit(): void {
    this.assignments = this.assignmentsService.getAssignments()
  }

}
