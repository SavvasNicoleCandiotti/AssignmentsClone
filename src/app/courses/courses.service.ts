import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'



@Injectable({
  providedIn: 'root'
})
export class CoursesService {

    private coursesArray : {
    id: number,
    name: string,
    gradeLevel: number,
    show_resources: {}[]
  }[] = []

  constructor(private http:HttpClient) {}
    // index
  fetchAllCourses(){
      return this.http.get('http://localhost:3000/courses');

    }

    // show route
  fetchCourse(id){
    return this.http.get('http://localhost:3000/courses/' + id);

   }
  }
