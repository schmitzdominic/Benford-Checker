import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {OptionTypes} from "../../models/option-types.model";

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  private option = new BehaviorSubject(OptionTypes.EXCEL);

  currentOptionState = this.option.asObservable();

  constructor() {
  }

  changeOption(option: OptionTypes) {
    this.option.next(option);
  }
}
