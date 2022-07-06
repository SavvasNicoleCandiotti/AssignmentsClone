import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { ProgramInterface } from './ProgramInterface';


@Injectable({
  providedIn: 'root'
})
export class ProgramsServiceService {

  private programsArray : ProgramInterface[] = []

  private programsStatus = "idle"
  public programStatus = "idle"

  constructor(private http:HttpClient) {}
    // index
  fetchAllPrograms(){
      return this.http.get('http://localhost:3000/programs');

    }

    // show route
  fetchProgram(id){
    return this.http.get('http://localhost:3000/programs/' + id);

   }

   selectProgramEvent = new EventEmitter<ProgramInterface>()
  
  getPrograms = () => [...this.programsArray];

  getProgram = (id : number) => this.programsArray.find(program => program.id === id)

  setPrograms = (array) => {
    this.programsArray = array
    console.log(this.programsArray)
  }

  addProgram = (program) => {
    this.programsArray = [...this.programsArray, {...program}]
  }

  setStatus = (status) => this.programsStatus = status

  getStatus = () => this.programsStatus

  getProgramsStatus = () => this.programStatus
  setProgramStatus = (status) => this.programStatus = status

  fetchEvent = new EventEmitter<string>()

}
