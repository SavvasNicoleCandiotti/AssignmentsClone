import { Component, OnInit, Output, EventEmitter, Input, enableProdMode } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-assignment-modal',
  templateUrl: './create-assignment-modal.component.html',
  styleUrls: ['./create-assignment-modal.component.css']
})
export class CreateAssignmentModalComponent implements OnInit {
  @Input() program_id?:number; //passing program id as an input from program detail component
  @Input() showModal:boolean
  @Output() modalBtnClick = new EventEmitter()
  modalForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    program_id: new FormControl(this.program_id)
  });
  charsRemaining:number=500


  constructor() { }

  ngOnInit(): void {
  }
  onClick(){
    this.modalBtnClick.emit()
  }

  submitModalForm(e:Event){
    e.preventDefault()
    console.log("form submitted")
    console.log(this.program_id)
     this.modalBtnClick.emit()
  }
  setLength(event){
 this.charsRemaining = 500 - event.length}
  }
