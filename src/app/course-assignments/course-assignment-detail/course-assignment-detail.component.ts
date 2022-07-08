import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseAssignmentsService } from '../../services/course-assignments.service';
import { CourseAssignmentInterface } from '../../models/CourseAssignmentInterface';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-course-assignment-detail',
  templateUrl: './course-assignment-detail.component.html',
  styleUrls: ['./course-assignment-detail.component.css']
})
export class CourseAssignmentDetailComponent implements OnInit {
  faEllipsisVertical=faEllipsisVertical
  public courseAssignment: CourseAssignmentInterface
  public status : string = "idle"
  showKebab:boolean= false
  showEditAssignmentModal:boolean = false

  constructor(
    private courseAssignmentsService : CourseAssignmentsService,
    private route : ActivatedRoute,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.courseAssignmentsService.selectCourseAssignmentEvent
      .subscribe(courseAssignment => this.courseAssignment = courseAssignment);

    this.courseAssignmentsService.fetchEvent
      .subscribe(status => this.status = status);

      //need to add error handling. What if they enter a url without a record?
    if(this.courseAssignmentsService.getCourseAssignment(parseInt(this.route.snapshot.params['id']))){
        this.courseAssignment = this.courseAssignmentsService.getCourseAssignment(
          parseInt(this.route.snapshot.params['id']))
          console.log("Didn't fetch")
      }else{
        this.getFetchedCourseAssignment()
      }
    this.courseAssignment = this.courseAssignmentsService.getCourseAssignment(
      parseInt(this.route.snapshot.params['id'])
    )
  }

  //this won't work
  //courses/1/course_assignments
  navigateToCourseAssignments = () => this.router.navigate(['assignments'])


  navigateHome = () => this.router.navigate(['/'])

  getFetchedCourseAssignment(){
    this.courseAssignmentsService.setCourseAssignmentStatus("loading")
    this.courseAssignmentsService.fetchEvent.emit("loading")
    setTimeout(
      () => this.courseAssignmentsService.fetchCourseAssignment(parseInt(this.route.snapshot.params['id'])).subscribe((r)=>{
        this.courseAssignmentsService.addCourseAssignment(r)
        this.courseAssignment = this.courseAssignmentsService.getCourseAssignment(parseInt(this.route.snapshot.params['id']))
        this.courseAssignmentsService.setCourseAssignmentStatus("success")
        this.courseAssignmentsService.fetchEvent.emit("success")

        console.log("fetched")
      }), 1000)
  }

  handleKebabClick(){
    this.showKebab = !this.showKebab
  }

}
