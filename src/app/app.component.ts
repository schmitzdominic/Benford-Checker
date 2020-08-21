import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'benford-checker';

  constructor(private translate: TranslateService) {
    // set browser language
    translate.setDefaultLang(this.translate.getBrowserLang());
  }
}
