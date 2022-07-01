import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  private assignmentsArray : {
    id: number, 
    title: string,
    description: string
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
    description: string
  }>()
  
  getAssignments = () => [...this.assignmentsArray];

  getAssignment = (id : number) => this.assignmentsArray.find(assignment => assignment.id === id)

  setAssignments = (array) => {
    this.assignmentsArray = array.map(assignment => {
      return {...assignment, dueOn: new Date (assignment.dueOn), assignedOn: new Date(assignment.assignedOn)}
    })
    console.log(this.assignmentsArray)
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

  formatDate(date: string){
    return new Date(parseInt(date.slice(0, 4)), parseInt(date.slice(5, 7)), parseInt(date.slice(8, 10)))
 }

}
