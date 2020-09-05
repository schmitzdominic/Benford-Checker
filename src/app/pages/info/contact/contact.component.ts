import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HeaderService} from "../../../services/header/header.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private headerService: HeaderService) {
  }

  ngOnInit(): void {
    this.headerService.darkToolbar(true);
    this.headerService.foldHeader(true);
  }

}
