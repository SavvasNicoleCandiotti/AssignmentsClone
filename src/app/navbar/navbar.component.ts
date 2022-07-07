import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isActive = false
  activeString = this.isActive ? "is-active" : ""

  constructor(private navbarService: NavbarService) {
    this.navbarService.toggleEvent
    .subscribe(() => this.activeString = this.navbarService.getActiveStatus() ? "is-active" : "");
   }

  ngOnInit(): void {
    this.isActive = this.navbarService.getActiveStatus()
  }

  handleToggle(){
    this.navbarService.toggleBurger()
  }
}
