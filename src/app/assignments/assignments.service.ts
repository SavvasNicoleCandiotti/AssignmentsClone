import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { AssignmentInterface } from './AssignmentInterface';
import { Observable } from 'rxjs';
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
  private apiUrl = 'http://localhost:3000/asssignments'

  private assignmentsArray : {
    id: number,
    title: string,
    description: string
    program_id: number
  }[] = []

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

  selectAssignmentEvent = new EventEmitter<{
    id: number,
    title: string,
    description: string,
    program_id: number
  }>()

  selectProgramAssignmentEvent = new EventEmitter<{
    id: number,
    title: string,
    description: string,
    program_id: number
  }>()

  getAssignments = () => [...this.assignmentsArray];

  getAssignment = (id : number) => this.assignmentsArray.find(assignment => assignment.id === id)

  setAssignments = (array) => {
    this.assignmentsArray = array.map(assignment => {
      return {
        ...assignment,
        dueOn: new Date (assignment.dueOn),
        assignedOn: new Date(assignment.assignedOn)
      }
    })
  }

  addAssignment = (assignment) => {
    this.assignmentsArray = [
      ...this.assignmentsArray,
      {...assignment,
        dueOn: new Date (assignment.dueOn),
        assignedOn: new Date(assignment.assignedOn)
      }
    ]
  }

  setStatus = (status) => this.assignmentsStatus = status

  getStatus = () => this.assignmentsStatus

  getAssignmentStatus = () => this.assignmentStatus
  setAssignmentStatus = (status) => this.assignmentStatus = status

  fetchEvent = new EventEmitter<string>()

  filterAssignmentsByProgram = (id : number) => this.assignmentsArray.filter(assignment => assignment.program_id === id)

  formatDate(date: string){
    return new Date(parseInt(date.slice(0, 4)), parseInt(date.slice(5, 7)), parseInt(date.slice(8, 10)))
  }
//  post request
postAssignment(assignment: AssignmentInterface): Observable<AssignmentInterface> {
  return this.http.post<AssignmentInterface>(this.apiUrl, assignment, httpOptions)
}
}
