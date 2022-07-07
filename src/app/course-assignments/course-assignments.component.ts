import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseAssignmentsService } from '../services/course-assignments.service';
import { CourseAssignmentInterface } from '../models/CourseAssignmentInterface';

@Component({
  selector: 'app-course-assignments',
  templateUrl: './course-assignments.component.html',
  styleUrls: ['./course-assignments.component.css']
})
export class CourseAssignmentsComponent implements OnInit {

  courseAssignmentsArray:CourseAssignmentInterface[] = []

  public status : string = "idle"

  constructor(
    private courseAssignmentsService : CourseAssignmentsService, 
    private route : ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.courseAssignmentsService.fetchEvent
      .subscribe(status => this.status = status);
    
    this.status = this.courseAssignmentsService.getStatus()
    if(this.status === "success"){
        this.courseAssignmentsArray = this.courseAssignmentsService.getCourseAssignmentsForProgram(
          parseInt(this.route.snapshot.params['id']))
          console.log(this.courseAssignmentsArray)
          console.log("Didn't fetch")
      }else if(this.status === "idle"){
        this.getAllCourseAssignments()
        
      }
  }

  getAllCourseAssignments(){
    this.courseAssignmentsService.setStatus("loading")
    this.courseAssignmentsService.fetchEvent.emit("loading")
    
    setTimeout(
      () => this.courseAssignmentsService.fetchAllCourseAssignments().subscribe((r)=>{
        this.courseAssignmentsService.setCourseAssignments(r)
        this.courseAssignmentsArray = this.courseAssignmentsService.getCourseAssignmentsForProgram(
          parseInt(this.route.snapshot.params['id'])
        )
        // this.courseAssignmentsArray = this.courseAssignmentsService.getCourseAssignments()
        this.courseAssignmentsService.setStatus("success")
        this.courseAssignmentsService.fetchEvent.emit("success")
        console.log("Fetched")
      }), 1000) 
  }

}
