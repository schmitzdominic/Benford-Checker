import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IngestComponent} from "./pages/ingest/ingest.component";
import {ResultComponent} from "./pages/result/result.component";
import {UploadExcelComponent} from "./pages/ingest/options/option-excel/upload-excel.component";
import {TextFieldComponent} from "./pages/ingest/options/option-text/text-field.component";
import {UploadCsvComponent} from "./pages/ingest/options/option-csv/upload-csv.component";
import {PrivacyComponent} from "./pages/info/privacy/privacy.component";

const routes: Routes = [
  {path: '', redirectTo: 'ingest', pathMatch: 'full'},
  {
    path: 'ingest',
    component: IngestComponent,
    children: [
      {path: '', redirectTo: 'option-excel', pathMatch: 'full'},
      {path: 'option-excel', component: UploadExcelComponent},
      {path: 'option-csv', component: UploadCsvComponent},
      {path: 'option-text', component: TextFieldComponent},
    ]
  },
  {path: 'result', component: ResultComponent},

  {path: 'privacy', component: PrivacyComponent},

  {path: '**', redirectTo: 'ingest', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
