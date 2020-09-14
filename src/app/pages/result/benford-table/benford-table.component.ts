import {Component, Input, OnInit} from '@angular/core';
import {Result} from '../../../models/result.model';

export interface PeriodicElement {
  position: number;
  frequency: number;
  percentage: string;
  benfordPercentage: string;
  difference: string;
}

@Component({
  selector: 'app-benford-table',
  templateUrl: './benford-table.component.html',
  styleUrls: ['./benford-table.component.scss']
})
export class BenfordTableComponent implements OnInit {

  @Input()
  result: Result;

  maxMobileWidth = 788;
  width = 700;

  tableData: PeriodicElement[] = [];

  displayedColumns: string[] = ['position', 'frequency', 'percentage', 'benfordPercentage', 'difference'];

  constructor() {
  }

  ngOnInit(): void {
    this.resize(window.innerWidth <= this.maxMobileWidth, window.innerWidth);
    this.fillTable();
  }

  fillTable(): void {
    if (this.result) {
      this.tableData = [];
      for (let i = 1; i <= 9; i++) {
        this.tableData.push({
          position: i,
          frequency: this.result.data[i],
          percentage: this.roundTwoDecimals(this.result.percentage[i]) + '%',
          benfordPercentage: this.roundTwoDecimals(this.result.originalPercentage[i]) + '%',
          difference: this.roundTwoDecimals(this.result.originalPercentage[i] - this.result.percentage[i]) + '%'
        });
      }
    }
  }

  roundTwoDecimals(num): number {
    return Math.round((num + Number.EPSILON) * 100) / 100;
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
