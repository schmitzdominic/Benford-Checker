import { Injectable } from '@angular/core';
import {Result} from "../../models/result.model";

@Injectable({
  providedIn: 'root'
})
export class BenfordService {

  constructor() { }

  calculate(list): Result {
    const result = new Result();
    result.original = list;
    list.forEach(entry => {
      const num = Number(entry);
      if (num) {
        const firstNumber = Number(entry.charAt(0));
        if (firstNumber) {
          result.benford.push(firstNumber);
          result.data[firstNumber] = result.data[firstNumber] + 1;
        }
      }
    })
    return result;
  }
}
