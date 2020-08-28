import {Component, EventEmitter, OnInit, Output} from '@angular/core';

export enum OptionTypes {
  EXCEL,
  CSV,
  TXT
}

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {

  @Output()
  chosenOption: EventEmitter<OptionTypes> = new EventEmitter<OptionTypes>();

  options = [
    {"type": OptionTypes.EXCEL, "icon": "insert_drive_file", "text": "ingest.options.text-excel", "color": "primary"},
    {"type": OptionTypes.CSV, "icon": "format_align_left", "text": "ingest.options.text-csv", "color": "primary"},
    {"type": OptionTypes.TXT, "icon": "text_fields", "text": "ingest.options.text-box", "color": "primary"},
  ]

  state = OptionTypes.EXCEL;
  text: string;

  constructor() {
  }

  ngOnInit(): void {
    this.changeState(this.state);
  }

  changeState(optionType: OptionTypes) {
    this.state = optionType;
    this.chosenOption.emit(this.state);
    this.options.forEach(option => {
      option.color = 'primary';
      if (optionType === option.type) {
        option.color = 'accent';
        this.text = option.text;
      }
    });
  }

  onOptionClick(value) {
    this.changeState(value);
  }
}
