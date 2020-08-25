import {Component, OnInit} from '@angular/core';
import {Result} from "../../models/result.model";
import {Router} from "@angular/router";

export interface PeriodicElement {
  position: number;
  frequency: number;
  percentage: string;
  benfordPercentage: string;
  difference: string;
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  result: Result;

  displayedColumns: string[] = ['position', 'frequency', 'percentage', 'benfordPercentage', 'difference'];
  tableData: PeriodicElement[] = [];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.result = history.state.data;
    if (!this.result) {
      this.router.navigate(['/']);
    }
    this.fillTable();
  }

  fillTable() {
    if (this.result) {
      this.tableData = [];
      for (let i = 1; i <= 9; i++) {
        this.tableData.push({
          position: i,
          frequency: this.result.data[i],
          percentage: this.roundTwoDecimals(this.result.percentage[i]) + '%',
          benfordPercentage: this.roundTwoDecimals(this.result.originalPercentage[i]) + '%',
          difference: this.roundTwoDecimals(this.result.originalPercentage[i] - this.result.percentage[i]) + '%'
        })
      }
    }
  }

  roundTwoDecimals(num): number {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }

}
