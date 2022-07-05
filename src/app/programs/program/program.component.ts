import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramsServiceService } from '../programs-service.service';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {

  @Input() program : {
    id: number, 
    name: string,
    gradeLevel: number,
    is_common_core: boolean;
  }

  constructor(
    private programsService : ProgramsServiceService,
    private router : Router,
    private route : ActivatedRoute
  ) {
   }

  ngOnInit(): void {
  }

  selectProgram = () => {
    this.programsService.selectProgramEvent.emit(this.program)
    this.router.navigate([this.program.id], {relativeTo: this.route})
  }
}
