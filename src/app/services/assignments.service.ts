import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { AssignmentInterface } from '../models/AssignmentInterface';
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
  private assignmentsSubject = new BehaviorSubject<AssignmentInterface[]>([])

  private assignmentsStatus = "idle"
  public assignmentStatus = "idle"

  private selectedAssignment : AssignmentInterface

  constructor(private http: HttpClient) { }
  // index route
  fetchAllAssignments(){
      return this.http.get('http://localhost:3000/assignments');
    }

    // show route
  fetchAssignment(id){
    return this.http.get('http://localhost:3000/assignments/' + id);
  }

  getAssignments = () => [...this.assignmentsArray];
  getAssignment = (id : number) => this.assignmentsArray.find(assignment => assignment.id === id)

  setAssignments = (array) => this.assignmentsArray = array
  addAssignment = (assignment) => this.assignmentsArray = [...this.assignmentsArray, assignment]

  setStatus = (status) => this.assignmentsStatus = status
  getStatus = () => this.assignmentsStatus

  getAssignmentStatus = () => this.assignmentStatus
  setAssignmentStatus = (status) => this.assignmentStatus = status

  setSelectedAssignment = (assignment) => this.selectedAssignment = assignment
  getSelectedAssignment = () => this.selectedAssignment

  fetchEvent = new EventEmitter<string>()
  postEvent = new EventEmitter<void>()
  selectAssignmentEvent = new EventEmitter<AssignmentInterface>()
  selectProgramAssignmentEvent = new EventEmitter<AssignmentInterface>()

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
//  getSubjectData():Observable<AssignmentInterface[]>{
//   return this.assignmentsSubject.asObservable()
//  }

//  setSubjectData(assignments: AssignmentInterface[]):void {
//   this.assignmentsSubject.next(assignments)
//  }

//  addAssignmentToSubject(assignment){
//   this.assignmentsSubject.next([...this.assignmentsSubject.getValue(), ...assignment])
//  }

}
