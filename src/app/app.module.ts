import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { IngestComponent } from './pages/ingest/ingest.component';
import {MatGridListModule} from "@angular/material/grid-list";
import { FooterComponent } from './pages/footer/footer.component';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSliderModule} from "@angular/material/slider";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";
import { UploadComponent } from './pages/ingest/upload/upload.component';
import { TextFieldComponent } from './pages/ingest/text-field/text-field.component';
import {MatToolbarModule} from "@angular/material/toolbar";

@NgModule({
  declarations: [
    AppComponent,
    IngestComponent,
    FooterComponent,
    UploadComponent,
    TextFieldComponent
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
    MatGridListModule,
    MatInputModule,
    MatSliderModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatToolbarModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
