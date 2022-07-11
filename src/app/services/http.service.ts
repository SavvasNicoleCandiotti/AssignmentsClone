import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  searchTerm: string = '';

  fetchEvent = new EventEmitter<string>();
  postEvent = new EventEmitter<void>();
  searchEvent = new EventEmitter<string>();

  constructor() {}
}
