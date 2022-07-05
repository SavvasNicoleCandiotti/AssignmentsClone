import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-home-course-card',
  templateUrl: './home-course-card.component.html',
  styleUrls: ['./home-course-card.component.css']
})
export class HomeCourseCardComponent implements OnInit {
  @Input() course;
  showProgramDropdown:boolean = false
 
  constructor(private route : ActivatedRoute, private router: Router){}
  
  ngOnInit(): void {
  }

  handleClick(){
    this.router.navigate(['/courses', this.course.id, "course_assignments"])
  }
    
  showPrograms(){
    this.showProgramDropdown=!this.showProgramDropdown
  }
  
  selectProgram = (id) => {
    this.router.navigate(['/programs', id])
  }

  selectCourseAssignment = (id) => this.router.navigate(['/courses', this.course.id, 'course_assignments', id])
}
