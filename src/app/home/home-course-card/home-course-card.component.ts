import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-home-course-card',
  templateUrl: './home-course-card.component.html',
  styleUrls: ['./home-course-card.component.css']
})
export class HomeCourseCardComponent implements OnInit {
  @Input() course;
 constructor(){}
handleClick(){
  console.log(this.course)
}


  ngOnInit(): void {
  }

}
