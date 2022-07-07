import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  fetchEvent = new EventEmitter<string>()
  postEvent = new EventEmitter<void>()
  
  constructor() { }


}
