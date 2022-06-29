import { Injectable } from '@angular/core';
import { Assignment } from './assignments/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  private assignments : Assignment[] = [ new Assignment(1, "First Assignment", "This is the first assignment",1, 1, "2022-06-05", "2022-07_05"), 
  new Assignment(2, "Second Assignment", "This is the second assignment",1, 2, "2022-06-06", "2022-07_06"), 
  new Assignment(3, "Third Assignment", "This is the first assignment",1, 3, "2022-06-07", "2022-07_07")]
  constructor() { }

  getAssignments = () => [...this.assignments];

  getAssignment = (id : number) => this.assignments.find(assignment => assignment.id === id)

}
