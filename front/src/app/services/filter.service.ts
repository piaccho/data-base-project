import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  OnProductNameFiltered = new EventEmitter<string>;

  filterProductName(productName: string) {
    this.OnProductNameFiltered.emit(productName);
  }  
}
