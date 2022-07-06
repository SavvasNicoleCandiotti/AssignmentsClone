import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { AssignmentInterface } from './AssignmentInterface';
import { Observable, BehaviorSubject } from 'rxjs';
// set headers for post and patch
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  private apiUrl = 'http://localhost:3000/assignments'

  private assignmentsArray : AssignmentInterface[] = []
  private subject: BehaviorSubject<AssignmentInterface[]> = new BehaviorSubject<AssignmentInterface[]>(
    [...this.assignmentsArray]
  );

  private assignmentsStatus = "idle"
  public assignmentStatus = "idle"

  constructor(private http: HttpClient) { }
  // index route
  fetchAllAssignments(){
      return this.http.get('http://localhost:3000/course_assignments');
    }

    // show route
  fetchAssignment(id){
    return this.http.get('http://localhost:3000/course_assignments/' + id);
  }

  selectAssignmentEvent = new EventEmitter<AssignmentInterface>()

  selectProgramAssignmentEvent = new EventEmitter<AssignmentInterface>()

  getAssignments = () => [...this.assignmentsArray];

  getAssignment = (id : number) => this.assignmentsArray.find(assignment => assignment.id === id)

  setAssignments = (array) => {
    this.assignmentsArray = array
  }

  addAssignment = (assignment) => {
    this.assignmentsArray = [...this.assignmentsArray, assignment]
  }

  setStatus = (status) => this.assignmentsStatus = status

  getStatus = () => this.assignmentsStatus

  getAssignmentStatus = () => this.assignmentStatus
  setAssignmentStatus = (status) => this.assignmentStatus = status

  fetchEvent = new EventEmitter<string>()

  filterAssignmentsByProgram = (id : number) => this.assignmentsArray.filter(assignment => assignment.program_id === id)

  //test if writing get req as observable
  getAssignmentsTest(): Observable<AssignmentInterface[]>{
    return this.http.get<AssignmentInterface[]>(this.apiUrl)
  }

  //  post request
  postAssignment(assignment: AssignmentInterface): Observable<AssignmentInterface> {
    return this.http.post<AssignmentInterface>(this.apiUrl, assignment, httpOptions)
  }

  //subject methods
  getSubjectData(assignment:AssignmentInterface):Observable<AssignmentInterface[]> {
    return this.subject
  }
}
