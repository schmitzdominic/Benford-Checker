import { Injectable } from '@angular/core';
import {Result} from "../../models/result.model";

@Injectable({
  providedIn: 'root'
})
export class BenfordService {

  constructor() { }

  calculate(list): Result {
    const result = new Result();
    // Set original list
    result.original = list;
    list.forEach(entry => {
      const num = Number(entry);
      if (num) {
        const firstNumber = Number(entry.charAt(0));
        if (firstNumber) {
          // Set Benford numbers
          result.benford.push(firstNumber);
          // Count numbers
          result.data[firstNumber] = result.data[firstNumber] + 1;
        }
      }
    });
    // Calculate percentage
    for (let i = 1; i <= 9; i++) {
      result.percentage[i] = result.data[i] / result.benford.length * 100;
    }
    return result;
  }
}
