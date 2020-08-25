import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title = "The Benford Checker"

  availableLanguages = [
    'Deutsch',
    'English'
  ]

  chosenLanguage;

  constructor(private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.chosenLanguage = this.translate.getBrowserLang();
  }

  changeLanguage(language) {
    this.translate.use(language);
    this.chosenLanguage = language;
  }

}
