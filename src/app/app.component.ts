import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private translate: TranslateService,
              private titleService: Title) {
  }

  ngOnInit(): void {
    // set browser language
    const currentLanguage = this.translate.getBrowserLang();
    this.translate.setDefaultLang(currentLanguage);
    this.translate.use(currentLanguage);
    // set page title
    this.translate.get('title').subscribe(text => {
      this.titleService.setTitle(text);
    });
  }
}
