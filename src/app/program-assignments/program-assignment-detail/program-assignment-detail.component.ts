import { Component, OnInit } from '@angular/core';
import { AssignmentInterface } from 'src/app/models/AssignmentInterface';
import { AssignmentsService } from 'src/app/services/assignments.service';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { CourseAssignmentsService } from 'src/app/services/course-assignments.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-program-assignment-detail',
  templateUrl: './program-assignment-detail.component.html',
  styleUrls: ['./program-assignment-detail.component.css']
})
export class ProgramAssignmentDetailComponent implements OnInit {
  faEllipsisVertical=faEllipsisVertical


  programAssignment : AssignmentInterface
  status : string = 'idle'

  constructor(
    private assignmentsService: AssignmentsService,
    private courseAssignmentsService : CourseAssignmentsService,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {

    const id = +this.route.snapshot.params['id']
    
    if(this.assignmentsService.getAssignment(id)){
      this.programAssignment = this.assignmentsService.getAssignment(id)
    }else{
      this.getFetchedProgramAssignment()
    }

    this.assignmentsService.fetchEvent
      .subscribe(status => this.status = status);

    this.route.params.subscribe((params : Params) => {
      if(this.assignmentsService.getAssignment(+params['id'])){
        this.programAssignment = this.assignmentsService.getAssignment(+params['id'])
      }else{
        this.getFetchedProgramAssignment()
      }
    })
  }

  openCreateCourseAssignmentModal(){
    this.courseAssignmentsService.toggleModalEvent.emit(true) 
  }

  closeModal(){
    this.courseAssignmentsService.toggleModalEvent.emit(false) 
  }

  getFetchedProgramAssignment(){
    this.assignmentsService.setAssignmentStatus("loading")
    this.assignmentsService.fetchEvent.emit("loading")
    setTimeout(
      () => this.assignmentsService.fetchAssignment(+this.route.snapshot.params['id']).subscribe((r)=>{
        this.assignmentsService.addAssignment(r)
        this.programAssignment = this.assignmentsService.getAssignment(+this.route.snapshot.params['id'])
        this.assignmentsService.setAssignmentStatus("success")
        this.assignmentsService.fetchEvent.emit("success")

        console.log("fetched")
      }), 1000)
  }

}
