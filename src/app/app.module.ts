import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {IngestComponent} from './pages/ingest/ingest.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {TextFieldComponent} from './pages/ingest/options/option-text/text-field.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ResultComponent} from './pages/result/result.component';
import {RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module} from 'ng-recaptcha';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {GroupedBarChartComponent} from './common/grouped-bar-chart/grouped-bar-chart.component';
import {MatTableModule} from '@angular/material/table';
import {UploadExcelComponent} from './pages/ingest/options/option-excel/upload-excel.component';
import {UploadCsvComponent} from './pages/ingest/options/option-csv/upload-csv.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatListModule} from '@angular/material/list';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {HeaderComponent} from './pages/structure/header/header.component';
import {MatMenuModule} from '@angular/material/menu';
import {OptionsComponent} from './pages/ingest/options/options.component';
import {FooterComponent} from './pages/structure/footer/footer.component';
import {PrivacyComponent} from './pages/info/privacy/privacy.component';
import {MatCardModule} from "@angular/material/card";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    AppComponent,
    IngestComponent,
    TextFieldComponent,
    ResultComponent,
    GroupedBarChartComponent,
    UploadExcelComponent,
    UploadCsvComponent,
    HeaderComponent,
    OptionsComponent,
    FooterComponent,
    PrivacyComponent
  ],
  imports: [

    // default angular
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    // translation
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    // everything else
    RecaptchaV3Module,
    NgxChartsModule,
    MatGridListModule,
    MatInputModule,
    MatSliderModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonToggleModule,
    MatListModule,
    ScrollingModule,
    MatMenuModule,
    MatCardModule,
    MatTooltipModule,

  ],
  providers: [
    {provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LejH8IZAAAAAMV0EEjkg_6F7cdMdvG1Pl9EgT6b'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
