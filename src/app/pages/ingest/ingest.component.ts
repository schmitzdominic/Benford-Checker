import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {OptionTypes} from '../../models/option-types.model';

@Component({
  selector: 'app-ingest',
  templateUrl: './ingest.component.html',
  styleUrls: ['./ingest.component.scss']
})
export class IngestComponent {

  options = [
    {type: OptionTypes.EXCEL, path: 'option-excel'},
    {type: OptionTypes.CSV, path: 'option-csv'},
    {type: OptionTypes.TXT, path: 'option-text'},
  ];

  ingestPath = 'ingest/';
  loaded: OptionTypes = OptionTypes.EXCEL;

  constructor(private router: Router) {
  }

  onOptionChange(event): void {
    this.options.forEach(option => {
      if (option.type === event) {
        if (this.loaded !== event) {
          this.router.navigate([this.ingestPath + option.path]).then(this.loaded = event);
        }
      }
    });
  }
}
