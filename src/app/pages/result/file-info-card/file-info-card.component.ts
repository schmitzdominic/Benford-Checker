import {Component, Input, OnInit} from '@angular/core';
import {Result} from '../../../models/result.model';

@Component({
  selector: 'app-file-info-card',
  templateUrl: './file-info-card.component.html',
  styleUrls: ['./file-info-card.component.scss']
})
export class FileInfoCardComponent implements OnInit {

  @Input()
  result: Result;

  firstNumbersCount = 8;
  maxMobileWidth = 788;
  width = 200;

  constructor() {
  }

  ngOnInit(): void {
    this.resize(window.innerWidth <= this.maxMobileWidth, window.innerWidth);
  }

  getFirstNumbers(count): string[] {
    const values: string[] = [];
    for (let index = 0; index < count; index++) {
      values.push(this.result.original[index]);
    }
    return values;
  }

  isNumber(value): number {
    return Number(value);
  }

  onResize(event): void {
    this.resize(event.target.innerWidth <= this.maxMobileWidth, event.target.innerWidth);
  }

  resize(isMobile, width): void {
    if (isMobile) {
      this.width = width;
    }
  }
}
