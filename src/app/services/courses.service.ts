import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CourseAssignmentInterface } from '../models/CourseAssignmentInterface';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  public coursesArray: {
    id: number;
    name: string;
    gradeLevel: number;
    programs: {}[];
    course_assignments: CourseAssignmentInterface[];
  }[] = [];

  //I don't think this is a valid data item
  //It would be a courseAssignmentArrayForSelectedCourse perhaps
  //there isn't a single array of courseAssignments, there is one for each course
  courseAssignmentsArray;
  filteredArray = [];

  private coursesStatus = 'idle';
  public courseStatus = 'idle';

  constructor(private http: HttpClient) {}
  // index
  fetchAllCourses() {
    return this.http.get('http://localhost:3000/courses');
  }

  // show route
  fetchCourse(id) {
    return this.http.get('http://localhost:3000/courses/' + id);
  }

  selectCourseEvent = new EventEmitter<{
    id: number;
    name: string;
    gradeLevel: number;
    show_resources: {}[];
  }>();

  getCourses = () => [...this.coursesArray];

  getCourse = (id: number) =>
    this.coursesArray.find((course) => course.id === id);

  setCourses = (array) => {
    this.coursesArray = array;
    console.log(this.coursesArray);
  };

  addCourse = (course) => {
    this.coursesArray = [...this.coursesArray, { ...course }];
  };

  setStatus = (status) => (this.coursesStatus = status);

  getStatus = () => this.coursesStatus;

  getCoursesStatus = () => this.courseStatus;
  setCourseStatus = (status) => (this.courseStatus = status);

  fetchEvent = new EventEmitter<string>();

  removeCourseAssignmentFromCourse(
    courseId: number,
    courseAssignmentId: number
  ) {
    this.coursesArray = this.coursesArray.map((course) => {
      if (course.id === courseId) {
        return {
          ...course,
          course_assignments: course.course_assignments.filter(
            (course_assignment) => course_assignment.id != courseAssignmentId
          ),
        };
      } else {
        return course;
      }
    });
  }

  updateCourseAssignmentInCourse(
    courseId: number,
    courseAssignment: CourseAssignmentInterface
  ) {
    this.coursesArray = this.coursesArray.map((course) => {
      if (course.id === courseId) {
        return {
          ...course,
          course_assignments: course.course_assignments.map(
            (course_assignment) => {
              if (course_assignment.id === courseAssignment.id) {
                return courseAssignment;
              } else {
                return course_assignment;
              }
            }
          ),
        };
      } else {
        return course;
      }
    });
  }

  addCourseAssignmentToCourse(courseAssignment: CourseAssignmentInterface) {
    this.coursesArray = this.coursesArray.map((course) => {
      if (course.id === courseAssignment.course_id) {
        return {
          ...course,
          course_assignments: [...course.course_assignments, courseAssignment]
        };
      } else {
        return course;
      }
    });
  }

  getCourseAssignmentsForCourse = (courseId : number) => this.coursesArray.find((course) => course.id === courseId).course_assignments
    
  getCourseAssignments = () =>
    (this.courseAssignmentsArray = this.coursesArray.map(
      (course) => course.course_assignments
    ));
}
