import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramInterface } from '../../models/ProgramInterface';
import { ProgramsServiceService } from '../../services/programs-service.service';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {

  @Input() program : ProgramInterface

  constructor() {
   }

  ngOnInit(): void {
  }

}
