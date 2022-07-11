import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseAssignmentsService } from '../services/course-assignments.service';
import { CourseAssignmentInterface } from '../models/CourseAssignmentInterface';
import { HttpService } from '../services/http.service';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-assignments',
  templateUrl: './course-assignments.component.html',
  styleUrls: ['./course-assignments.component.css'],
})
export class CourseAssignmentsComponent implements OnInit {
  courseAssignmentsArray: CourseAssignmentInterface[] = [];
  searchTerm: string = '';
  faChevronRight = faChevronRight;
  faMagnifyingGlass = faMagnifyingGlass;

  public status: string = 'idle';

  constructor(
    private courseAssignmentsService: CourseAssignmentsService,
    private route: ActivatedRoute,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.courseAssignmentsService.fetchEvent.subscribe(
      (status) => (this.status = status)
    );

    this.status = this.courseAssignmentsService.getStatus();
    if (this.status === 'success') {
      this.courseAssignmentsArray =
        this.courseAssignmentsService.getCourseAssignmentsForCourse(
          parseInt(this.route.snapshot.params['id'])
        );
      console.log(this.courseAssignmentsArray);
      console.log("Didn't fetch");
    } else if (this.status === 'idle') {
      this.getAllCourseAssignments();
    }
  }

  handleCourseAssignmentSearch(e) {
    this.courseAssignmentsArray =
      this.courseAssignmentsService.getCourseAssignmentsForCourse(
        parseInt(this.route.snapshot.params['id'])
      );
    this.searchTerm = e.target.value;
    let filteredArray = this.courseAssignmentsArray.filter((assignment) =>
      assignment.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.courseAssignmentsArray = filteredArray;
    console.log(this.courseAssignmentsArray);
  }

  getAllCourseAssignments() {
    this.courseAssignmentsService.setStatus('loading');
    this.courseAssignmentsService.fetchEvent.emit('loading');

    setTimeout(
      () =>
        this.courseAssignmentsService
          .fetchAllCourseAssignments()
          .subscribe((r) => {
            this.courseAssignmentsService.setCourseAssignments(r);
            this.courseAssignmentsArray =
              this.courseAssignmentsService.getCourseAssignmentsForCourse(
                parseInt(this.route.snapshot.params['id'])
              );
            // this.courseAssignmentsArray = this.courseAssignmentsService.getCourseAssignments()
            this.courseAssignmentsService.setStatus('success');
            this.courseAssignmentsService.fetchEvent.emit('success');
            console.log('Fetched');
          }),
      1000
    );
  }
}
