import { EventEmitter,Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestDataService {

  UpdateNavbar = new EventEmitter<any>();
  constructor() { }
}
