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
      return this.http.get(this.apiUrl);
    }

    // show route
  fetchCourseAssignment(id){
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  //  post request
  postAssignment(assignment): Observable<CourseAssignmentInputInterface> {
    return this.http.post<CourseAssignmentInputInterface>(this.apiUrl, assignment, httpOptions)
  }

  //patch for  edit course assignment (edit course assignment modal)
  updateAssignment(courseAssignment: CourseAssignmentInterface):Observable<CourseAssignmentInterface>{
    const url = `${this.apiUrl}/${courseAssignment.id}`
    return this.http.patch<CourseAssignmentInterface>(url, courseAssignment, httpOptions)
  }

  deleteAssignment(courseAssignment: CourseAssignmentInterface):Observable<CourseAssignmentInterface>{
    const url = `${this.apiUrl}/${courseAssignment.id}`
    return this.http.delete<CourseAssignmentInterface>(url)
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
  getCourseAssignmentsForCourse = (id : number) => this.courseAssignmentsArray.filter(courseAssignment => courseAssignment.course_id === id)

  setStatus = (status) => this.courseAssignmentsStatus = status

  getStatus = () => this.courseAssignmentsStatus

  getCourseAssignmentStatus = () => this.courseAssignmentStatus
  setCourseAssignmentStatus = (status) => this.courseAssignmentStatus = status

  fetchEvent = new EventEmitter<string>()

  formatDate(date: string){
    return new Date(parseInt(date.slice(0, 4)), parseInt(date.slice(5, 7)), parseInt(date.slice(8, 10)))
 }

}
