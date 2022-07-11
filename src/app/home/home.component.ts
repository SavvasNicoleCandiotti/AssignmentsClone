import { Component, OnInit } from '@angular/core';
import { CourseAssignmentsService } from '../services/course-assignments.service';
import { CoursesService } from '../services/courses.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  coursesArray: {} = [];
  public status: string = 'idle';

  constructor(
    private coursesService: CoursesService,
    private courseAssignmentsService: CourseAssignmentsService,
    private httpService: HttpService
  ) {
    //     this.getCourses()
    // putting this here means that it will always fetch when you go to the component
  }

  ngOnInit(): void {
    this.coursesService.fetchEvent.subscribe(
      (status) => (this.status = status)
    );

    this.courseAssignmentsService.updateEvent.subscribe(
      () => this.coursesArray = this.coursesService.getCourses()
    );

    this.courseAssignmentsService.deleteEvent.subscribe(
      () => this.coursesArray = this.coursesService.getCourses()
    );

    this.httpService.postEvent.subscribe(
      () => this.coursesArray = this.coursesService.getCourses()
    );

    //check the status of courses to see if they have already been fetched before
    //this will prevent the fetch from happening everytime the component is constructed
    this.status = this.coursesService.getStatus();
    if (this.status === 'success') {
      //set coursesArray to be coursesArray in the service
      this.coursesArray = this.coursesService.getCourses();
      console.log("Didn't fetch");
    } else if (this.status === 'idle') {
      //putting this here means it only fetches if it hasn't been fetched before
      this.getCourses();
    }

    this.httpService.searchEvent.subscribe(() => {
      console.log(this.courseAssignmentsService.searchTerm);
    });
  }

  getCourses() {
    //this loads the spinner while it loads
    this.coursesService.setStatus('loading');
    this.coursesService.fetchEvent.emit(this.coursesService.getStatus());
    setTimeout(
      () =>
        this.coursesService.fetchAllCourses().subscribe((r) => {
          //set coursesArray in coursesService to r
          this.coursesService.setCourses(r);
          // setCoursesArray in this component to be the same as in the service
          this.coursesArray = this.coursesService.getCourses();
          //set status to success to stop rendering the spinner and load the component
          this.coursesService.setStatus('success');
          this.coursesService.fetchEvent.emit(this.coursesService.getStatus());
          console.log('Fetched');
        }),
      1000
    );
  }
}
