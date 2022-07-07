import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentInterface } from 'src/app/models/AssignmentInterface';
import { AssignmentsService } from 'src/app/assignments/assignments.service';
import { ProgramInterface } from '../ProgramInterface';
import { ProgramsServiceService } from '../programs-service.service';

@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.component.html',
  styleUrls: ['./program-detail.component.css']
})
export class ProgramDetailComponent implements OnInit {

  showCreateAssignmentModal : boolean = false
  public program: ProgramInterface

  public status : string = "idle"
  programAssignment : AssignmentInterface

  constructor(
    private programsService : ProgramsServiceService,
    private assignmentsService: AssignmentsService,
    private route : ActivatedRoute,
    private router : Router
  ) {}

  ngOnInit(): void {
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
  toggleModal(){
    this.showCreateAssignmentModal = !this.showCreateAssignmentModal
  }
  closeModal(){
  this.showCreateAssignmentModal = false;
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
