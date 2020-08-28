import {Component, OnInit} from '@angular/core';
import {OptionsService} from "../../../../services/options/options.service";
import {OptionTypes} from "../../../../models/option-types.model";

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent implements OnInit {

  constructor(private optionsService: OptionsService) {
  }

  ngOnInit(): void {
    this.optionsService.changeOption(OptionTypes.TXT);
  }

}
