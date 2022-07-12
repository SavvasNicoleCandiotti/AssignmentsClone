import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentInterface } from 'src/app/models/AssignmentInterface';
import { ProgramAssignmentComponent } from 'src/app/program-assignments/program-assignment/program-assignment.component';
import { AssignmentsService } from 'src/app/services/assignments.service';
import { CourseAssignmentsService } from 'src/app/services/course-assignments.service';
import { ProgramInterface } from '../../models/ProgramInterface';
import { ProgramsServiceService } from '../../services/programs-service.service';

@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.component.html',
  styleUrls: ['./program-detail.component.css']
})
export class ProgramDetailComponent implements OnInit {

  showCreateAssignmentModal : boolean = false
  showCreateCourseAssignmentModal : boolean = false

  public program: ProgramInterface

  public status : string = "idle"
  @Input() programAssignment : AssignmentInterface

  constructor(
    private programsService : ProgramsServiceService,
    private assignmentsService: AssignmentsService,
    private route : ActivatedRoute,
    private router : Router,
    private courseAssignmentsService : CourseAssignmentsService
  ) {}

  ngOnInit(): void {
    this.courseAssignmentsService.toggleModalEvent
    .subscribe(boolean => {
      this.showCreateCourseAssignmentModal = boolean
    })
    
    this.assignmentsService.toggleCreateAssignmentModalEvent
    .subscribe(boolean => {
      this.showCreateAssignmentModal = boolean
    })
    this.programsService.selectProgramEvent
      .subscribe(program => this.program = program);

    this.programsService.fetchEvent
      .subscribe(status => this.status = status);

      //need to add error handling. What if they enter a url without a record?
    if(this.programsService.getProgram(parseInt(this.route.snapshot.params['id']))){
        this.program = this.programsService.getProgram(
          parseInt(this.route.snapshot.params['id']))
          console.log("Didn't fetch")
      }else{
        this.getFetchedProgram()
      }
    this.program = this.programsService.getProgram(
      parseInt(this.route.snapshot.params['id'])
    )
    this.assignmentsService.selectProgramAssignmentEvent.subscribe(programAssignment => this.programAssignment = programAssignment)
  }
  
  //toggleModal for CreateCA lives in program-assignment-detail where the button is
  //there needs to be a function in a service with a connected event emitter that are triggered by this function
  //this component needs to subscribe to that event and reset the value of showCreateCourseAssignmentModal

  toggleModal(){
    this.showCreateAssignmentModal = !this.showCreateAssignmentModal
  }
  //this stays here for CreateCA, but needs to be renamed
  closeModal(){
  this.showCreateAssignmentModal = false;
  }

  closeCreateCourseAssignmentModal(){
    this.showCreateCourseAssignmentModal = false
  }

  //this won't work
  //courses/1/course_assignments
  navigateToPrograms = () => this.router.navigate(['assignments'])


  navigateHome = () => this.router.navigate(['/'])

  getFetchedProgram(){
    this.programsService.setProgramStatus("loading")
    this.programsService.fetchEvent.emit("loading")
    setTimeout(
      () => this.programsService.fetchProgram(parseInt(this.route.snapshot.params['id'])).subscribe((r)=>{
        this.programsService.addProgram(r)
        this.program = this.programsService.getProgram(parseInt(this.route.snapshot.params['id']))
        this.programsService.setProgramStatus("success")
        this.programsService.fetchEvent.emit("success")

        console.log("fetched")
      }), 1000)
  }
}
