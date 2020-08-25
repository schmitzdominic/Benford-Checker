import {Component, Input, OnInit} from '@angular/core';
import {Result} from "../../models/result.model";

@Component({
  selector: 'app-grouped-bar-chart',
  templateUrl: './grouped-bar-chart.component.html',
  styleUrls: ['./grouped-bar-chart.component.scss']
})
export class GroupedBarChartComponent implements OnInit {

  @Input()
  result: Result;

  view: any[] = [700, 450];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  yAxisLabel: string;

  colorScheme = {
    domain: ['#392314', '#ff4800', '#AAAAAA']
  };

  multi: any;

  constructor() {
  }

  ngOnInit(): void {
    this.fillChart();
  }

  fillChart() {
    if (this.result) {
      const multi = [];
      for (let i = 1; i <= 9; i++) {
        multi.push({
          "name": i + '',
          "series": [
            {
              "name": "Benford",
              "value": this.result.originalPercentage[i]
            },
            {
              "name": "Data",
              "value": this.result.percentage[i]
            }
          ]
        });
      }
      Object.assign(this, {multi})
    }
  }
}
