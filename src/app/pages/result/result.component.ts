import { Component, OnInit } from '@angular/core';
import {Result} from "../../models/result.model";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  result: Result;

  constructor() { }

  ngOnInit(): void {
    this.result = history.state.data;
  }

}
