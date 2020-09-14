import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {HeaderService} from '../../../services/header/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  title = 'The Benford Checker';

  year = (new Date()).getFullYear();

  fold: boolean;
  dark: boolean;

  availableLanguages = [
    'Deutsch',
    'English'
  ];

  chosenLanguage;

  constructor(private translate: TranslateService,
              private headerService: HeaderService) {
  }

  ngOnInit(): void {
    this.registerSharedOptions();
    this.chosenLanguage = this.translate.getBrowserLang();
  }

  registerSharedOptions(): void {
    this.headerService.currentFoldState.subscribe(state => {
      this.fold = state;
    });
    this.headerService.currentDarkState.subscribe(state => {
      this.dark = state;
    });
  }

  changeLanguage(language): void {
    this.translate.use(language);
    this.chosenLanguage = language;
  }
}
