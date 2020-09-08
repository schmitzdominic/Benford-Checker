import {Component, OnDestroy, OnInit} from '@angular/core';
import {Result} from '../../models/result.model';
import {Router} from '@angular/router';
import {HeaderService} from '../../services/header/header.service';

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
export class ResultComponent implements OnInit, OnDestroy {

  result: Result;
  diff: number;
  conclusionResult: number;

  displayedColumns: string[] = ['position', 'frequency', 'percentage', 'benfordPercentage', 'difference'];
  tableData: PeriodicElement[] = [];

  constructor(private router: Router,
              private headerService: HeaderService) {
  }

  ngOnInit(): void {
    this.headerService.darkToolbar(true);
    this.headerService.foldHeader(true);
    this.result = history.state.data;
    this.result.scoring = 100;
    if (!this.result) {
      this.router.navigate(['']);
    }
    this.fillTable();
    this.checkScore();

  }

  ngOnDestroy(): void {
    this.headerService.darkToolbar(false);
    this.headerService.foldHeader(false);
  }

  fillTable(): void {
    if (this.result) {
      this.tableData = [];
      for (let i = 1; i <= 9; i++) {
        this.diff = this.roundTwoDecimals(this.result.originalPercentage[i] - this.result.percentage[i]);
        this.updateScoring(this.diff);
        this.tableData.push({
          position: i,
          frequency: this.result.data[i],
          percentage: this.roundTwoDecimals(this.result.percentage[i]) + '%',
          benfordPercentage: this.roundTwoDecimals(this.result.originalPercentage[i]) + '%',
          difference: this.diff + '%',
        });
      }
    }
  }

  roundTwoDecimals(num): number {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }

  updateScoring(difference: number): void {
    this.result.scoring = this.roundTwoDecimals(difference <= 0 ? this.result.scoring + difference : this.result.scoring - difference);
  }

  checkScore(): void {
    this.conclusionResult = 100 - this.result.scoring;
  }

  isNumber(value): number {
    return Number(value);
  }

  getFirstFiveNumbers(): string[] {
    const values: string[] = [];
    for (let index = 0; index < 8; index++) {
      values.push(this.result?.original[index]);
    }
    return values;
  }

}
