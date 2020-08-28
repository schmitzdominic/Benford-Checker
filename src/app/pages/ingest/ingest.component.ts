import {Component} from '@angular/core';
import {OptionTypes} from "./options/options.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ingest',
  templateUrl: './ingest.component.html',
  styleUrls: ['./ingest.component.scss']
})
export class IngestComponent {

  options = [
    {"type": OptionTypes.EXCEL, "path": "option-excel"},
    {"type": OptionTypes.CSV, "path": "option-csv"},
    {"type": OptionTypes.TXT, "path": "option-text"},
  ]

  ingestPath = 'ingest/';
  loaded: OptionTypes = OptionTypes.EXCEL;

  constructor(private router: Router) {
  }

  onOptionChange(event) {
    this.options.forEach(option => {
      if (option.type === event) {
        if (this.loaded != event) {
          this.router.navigate([this.ingestPath + option.path]).then(this.loaded = event);
        }
      }
    });
  }

}
