import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IngestComponent} from "./pages/ingest/ingest.component";

const routes: Routes = [
  {path: '', redirectTo: '/ingest', pathMatch: 'full'},
  {path: 'ingest', component: IngestComponent},

  {path: '**', redirectTo: '/ingest', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
