import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConvertService {

  splitRegex = /\r\n|\n|,/;

  constructor() {
  }

  fromTextToList(rawText): string[] {
    return (rawText as string).split(this.splitRegex);
  }

  fromJsonToList(json, filterValue): string[] {
    const list: string[] = [];
    json.forEach(obj => {
      try {
        const value = obj[filterValue];
        if (value) {
          list.push(value);
        }
      } catch (error) {
        // TODO: Log this error correct!
        console.log(error);
      }
    });
    return list;
  }
}
