import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { faChartColumn } from '@fortawesome/free-solid-svg-icons';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { CourseAssignmentsService } from 'src/app/services/course-assignments.service';
import { CoursesService } from 'src/app/services/courses.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home-course-card',
  templateUrl: './home-course-card.component.html',
  styleUrls: ['./home-course-card.component.css'],
})
export class HomeCourseCardComponent implements OnInit {
  @Input() course;
  searchTerm: string = '';
  showProgramDropdown: boolean = false;
  // courseAssignmentsArray = this.courseAssignmentService.getCourseAssignment(
  //   this.courseAssignmentService.course_id
  // );
  courseAssignmentsArray;
  // courseAssignments = this.coursesService.getCourseAssignments();

  //icons
  faMagnifyingGlass = faMagnifyingGlass;
  faPencil = faPencil;
  faUserGroup = faUserGroup;
  faBookOpen = faBookOpen;
  faChartColumn = faChartColumn;
  faCaretDown = faCaretDown;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private courseAssignmentService: CourseAssignmentsService,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.courseAssignmentService.course_id = this.course.id;
    this.courseAssignmentsArray = this.course.course_assignments;
  }

  handleClick() {
    this.router.navigate(['/courses', this.course.id, 'course_assignments']);
  }

  selectProgram = (id) => {
    this.router.navigate(['/programs', id]);
  };

  selectCourseAssignment = (id) =>
    this.router.navigate([
      '/courses',
      this.course.id,
      'course_assignments',
      id,
    ]);

  handleSearch(e) {
    //sets course id in service
    this.courseAssignmentService.course_id = this.course.id;
    //sets search term in service
    this.courseAssignmentService.searchTerm = e.target.value;

    let courseAssignments = this.course.course_assignments;

    let filteredArray = courseAssignments.filter((course) =>
      course.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    this.courseAssignmentsArray = filteredArray;
    this.httpService.searchEvent.emit(e.target.value);
  }
}
