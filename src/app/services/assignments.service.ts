import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  constructor(private http: HttpClient) {}
    fetchAssignments(){
      return this.http.get('http://localhost:8080/assignment');
    }
   
}
//http://localhost:8080/assignment?title=Assessment2