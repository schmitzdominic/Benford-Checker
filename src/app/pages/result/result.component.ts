import {Component, OnDestroy, OnInit} from '@angular/core';
import {Result} from '../../models/result.model';
import {Router} from '@angular/router';
import {HeaderService} from '../../services/header/header.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, OnDestroy {

  result: Result;

  breakpoint: number;
  height: number;
  isMobile;
  maxMobileWidth = 788;

  constructor(private router: Router,
              private headerService: HeaderService) {
  }

  ngOnInit(): void {
    this.resize(window.innerWidth <= this.maxMobileWidth);
    this.headerService.darkToolbar(true);
    this.headerService.foldHeader(true);
    this.result = history.state.data;
    if (!this.result) {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy(): void {
    this.headerService.darkToolbar(false);
    this.headerService.foldHeader(false);
  }

  onResize(event): void {
    this.resize(event.target.innerWidth <= this.maxMobileWidth);
  }

  resize(isMobile): void {
    this.breakpoint = isMobile ? 2 : 3;
    this.height = isMobile ? 8 : 10;
    this.isMobile = isMobile;
  }
}
