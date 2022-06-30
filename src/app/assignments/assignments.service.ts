import { EventEmitter, Injectable } from '@angular/core';
import { Assignment } from './assignment.model';
import {HttpClient} from '@angular/common/http'
import { formatDate } from '@angular/common';
import { TemplateBindingParseResult } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  private assignmentsArray : {
    id: number, 
    course_id: number, 
    assignment_id: number,
    assignedOn: Date,
    dueOn: Date,
    title: string,
    description: string
  }[] = []

  public initialFetch = false

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
    course_id: number, 
    assignment_id: number,
    assignedOn: Date,
    dueOn: Date,
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

  formatDate(date: string){
    return new Date(parseInt(date.slice(0, 4)), parseInt(date.slice(5, 7)), parseInt(date.slice(8, 10)))
 }

}
