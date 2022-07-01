import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses/courses.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  coursesArray:{}=[]

  constructor(  private coursesService : CoursesService) {
    this.getCourses()
   }
getCourses(){
  this.coursesService.fetchAllCourses().subscribe(r =>{this.coursesArray=r
  console.log(r)

})
}

  ngOnInit(): void {
  }

}
