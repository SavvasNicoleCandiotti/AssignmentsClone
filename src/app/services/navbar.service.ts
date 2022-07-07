import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  isActive = false

  constructor() { }
  
  toggleEvent = new EventEmitter<void>()

  toggleBurger(){
    this.isActive = !this.isActive
    this.toggleEvent.emit()
  }

  getActiveStatus(){
    return this.isActive
  }

}
