import { Injectable, EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http'



@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private coursesArray : {
    id: number,
    name: string,
    gradeLevel: number,
    programs: {}[],
    course_assignments: {}[]
  }[] = []

  private coursesStatus = "idle"
  public courseStatus = "idle"

  constructor(private http:HttpClient) {}
    // index
  fetchAllCourses(){
      return this.http.get('http://localhost:3000/courses');

    }

    // show route
  fetchCourse(id){
    return this.http.get('http://localhost:3000/courses/' + id);

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

  getCoursesStatus = () => this.courseStatus
  setCourseStatus = (status) => this.courseStatus = status

  fetchEvent = new EventEmitter<string>()

  }
