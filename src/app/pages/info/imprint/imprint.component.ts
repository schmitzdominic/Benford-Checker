import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderService} from '../../../services/header/header.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss']
})
export class ImprintComponent implements OnInit, OnDestroy {

  constructor(private headerService: HeaderService) {
  }

  ngOnInit(): void {
    this.headerService.foldHeader(true);
    this.headerService.darkToolbar(true);
  }

  ngOnDestroy(): void {
    this.headerService.foldHeader(false);
    this.headerService.darkToolbar(false);
  }

}
