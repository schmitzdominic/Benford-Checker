import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecaptchaService {

  URL = 'https://www.google.com/recaptcha/api/siteverify';

  constructor(private httpClient: HttpClient) { }

  validate(secret: string, token: string): Observable<any> {
    const body = {
      secret,
      response: token
    };
    return this.httpClient.post(this.URL, body);
  }
}
