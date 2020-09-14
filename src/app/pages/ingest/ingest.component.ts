import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OptionTypes} from '../../models/option-types.model';

@Component({
  selector: 'app-ingest',
  templateUrl: './ingest.component.html',
  styleUrls: ['./ingest.component.scss']
})
export class IngestComponent implements OnInit {

  options = [
    {type: OptionTypes.EXCEL, path: 'option-excel'},
    {type: OptionTypes.CSV, path: 'option-csv'},
    {type: OptionTypes.TXT, path: 'option-text'},
  ];

  breakpoint: number;
  optionsHeight: number;
  maxMobileWidth = 788;
  ingestPath = 'ingest/';
  loaded: OptionTypes = OptionTypes.EXCEL;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.resize(window.innerWidth <= this.maxMobileWidth);
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

  onResize(event): void {
    this.resize(event.target.innerWidth <= this.maxMobileWidth);
  }

  resize(isMobile): void {
    this.breakpoint = isMobile ? 1 : 2;
    this.optionsHeight = isMobile ? 4 : 10;
  }
}
