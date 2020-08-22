import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConvertService {

  splitRegex = /\r\n|\n|,/;

  constructor() { }

  fromTextToList(rawText) {
    return (<string>rawText).split(this.splitRegex);
  }
}
