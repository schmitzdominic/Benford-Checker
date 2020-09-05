import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HeaderService} from "../../../services/header/header.service";
import {ContactData} from "../../../models/contact-data.model";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactData = new ContactData();

  constructor(private headerService: HeaderService) {
  }

  ngOnInit(): void {
    this.headerService.darkToolbar(true);
    this.headerService.foldHeader(true);
  }

  send(): void {
    // check mandatory input fields
    // create e-mail and send it
  }

}
