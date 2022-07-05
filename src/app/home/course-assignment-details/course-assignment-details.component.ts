import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-course-assignment-details',
  templateUrl: './course-assignment-details.component.html',
  styleUrls: ['./course-assignment-details.component.css']
})
export class CourseAssignmentDetailsComponent implements OnInit {
  @Input() courseAssignment
  number:number = this.randomNumber()

  constructor() { }

  randomNumber():number{
   return Math.floor(Math.random() * 8) + 1
  }

  ngOnInit(): void {
    console.log("from course assignment details", this.courseAssignment)
  }

}
