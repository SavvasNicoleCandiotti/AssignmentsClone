import { Injectable, EventEmitter } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { CourseAssignmentInterface } from '../models/CourseAssignmentInterface';
import { CourseAssignmentInputInterface } from '../models/course-assignment-input-interface';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class CourseAssignmentsService {

  private apiUrl = 'http://localhost:3000/course_assignments'

  private courseAssignmentsArray : CourseAssignmentInterface[] = []

  private courseAssignmentsStatus = "idle"
  public courseAssignmentStatus = "idle"

  constructor(private http: HttpClient) { }
  // index route
  fetchAllCourseAssignments(){
      return this.http.get('http://localhost:3000/course_assignments');
    }

    // show route
  fetchCourseAssignment(id){
    return this.http.get('http://localhost:3000/course_assignments/' + id);
  }

  //  post request
  postAssignment(assignment): Observable<CourseAssignmentInputInterface> {
    return this.http.post<CourseAssignmentInputInterface>(this.apiUrl, assignment, httpOptions)
  }

  selectCourseAssignmentEvent = new EventEmitter<CourseAssignmentInterface>()
  
  getCourseAssignments = () => [...this.courseAssignmentsArray];

  getCourseAssignment = (id : number) => this.courseAssignmentsArray.find(courseAssignment => courseAssignment.id === id)

  setCourseAssignments = (array) => {
    this.courseAssignmentsArray = array
    console.log(this.courseAssignmentsArray)
  }

  addCourseAssignment = (courseAssignment) => {
    this.courseAssignmentsArray = [
      ...this.courseAssignmentsArray, 
      {...courseAssignment}
    ]
  }

  getCourseAssignmentsForProgram = (id : number) => this.courseAssignmentsArray.filter(courseAssignment => courseAssignment.program_id === id)

  setStatus = (status) => this.courseAssignmentsStatus = status

  getStatus = () => this.courseAssignmentsStatus

  getCourseAssignmentStatus = () => this.courseAssignmentStatus
  setCourseAssignmentStatus = (status) => this.courseAssignmentStatus = status

  fetchEvent = new EventEmitter<string>()

  formatDate(date: string){
    return new Date(parseInt(date.slice(0, 4)), parseInt(date.slice(5, 7)), parseInt(date.slice(8, 10)))
 }

}
