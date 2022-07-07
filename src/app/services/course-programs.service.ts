import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseProgramsService {
  private coursesArray : {
    id: number,
    name: string,
    gradeLevel: number,
    show_resources: {}[]
  }[] = []

  private coursesStatus = "idle"
  public courseStatus = "idle"

  constructor(private http:HttpClient) {}
    // index
  fetchAllCourses(){
      return this.http.get('http://localhost:3000/course_programs');

    }

    // show route
  fetchCourse(id){
    return this.http.get('http://localhost:3000/course_programs/' + id);

   }

   selectCourseEvent = new EventEmitter<{
    id: number,
    name: string,
    gradeLevel: number,
    show_resources: {}[]
  }>()
  
  getCourses = () => [...this.coursesArray];

  getCourse = (id : number) => this.coursesArray.find(course => course.id === id)

  setCourses = (array) => {
    this.coursesArray = array
    console.log(this.coursesArray)
  }

  addCourse = (course) => {
    this.coursesArray = [...this.coursesArray, {...course}]
  }

  setStatus = (status) => this.coursesStatus = status

  getStatus = () => this.coursesStatus

  getCourseAssignmentStatus = () => this.courseStatus
  setCourseAssignmentStatus = (status) => this.courseStatus = status

  fetchEvent = new EventEmitter<string>()

}
