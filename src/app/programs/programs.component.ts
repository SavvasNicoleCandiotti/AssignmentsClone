import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../services/assignments.service';
import { ProgramInterface } from '../models/ProgramInterface';
import { ProgramsServiceService } from '../services/programs-service.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {

  programsArray:ProgramInterface[] = []

  public status : string = "idle"
  public programAssignmentSelected : boolean = false

  constructor(private programsService : ProgramsServiceService) {
  }

  ngOnInit(): void {

    this.programsService.fetchEvent
      .subscribe(status => this.status = status);
    
    this.status = this.programsService.getStatus()
    if(this.status === "success"){
        this.programsArray = this.programsService.getPrograms()
          console.log("Didn't fetch")
      }else if(this.status === "idle"){
        this.getAllPrograms()
      }
  }

  getAllPrograms(){
    this.programsService.setStatus("loading")
    this.programsService.fetchEvent.emit("loading")

    setTimeout(
      () => this.programsService.fetchAllPrograms().subscribe((r)=>{
        this.programsService.setPrograms(r)
        this.programsArray = this.programsService.getPrograms()
        this.programsService.setStatus("success")
        this.programsService.fetchEvent.emit("success")
        console.log("Fetched")
      }), 1000) 
  }
}
