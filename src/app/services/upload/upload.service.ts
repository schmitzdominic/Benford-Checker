import { Injectable } from '@angular/core';
import {HttpClient, HttpEventType} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  // TODO: Change this URL and make sure it will change for deployment!
  SERVER_URL: string = "http://localhost:4200";

  constructor(private httpClient: HttpClient) { }

  public upload(data) {
    let uploadURL = `${this.SERVER_URL}/api/ingest/upload`;

    return this.httpClient.post<any>(uploadURL, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {

        switch (event.type) {

          case HttpEventType.UploadProgress:
            const progress = Math.round(100 * event.loaded / event.total);
            return { status: 'progress', message: progress };

          case HttpEventType.Response:
            return event.body;
          default:
            return `Unhandled event: ${event.type}`;
        }
      })
    );
  }
}
