import {Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  private error = new BehaviorSubject(undefined);

  currentError = this.error.asObservable();

  constructor(private translate: TranslateService) {
  }

  isValidAppend(file, validFileType, maxFileSize: Number): boolean {
    this.error.next(undefined);
    let noError = true;
    if (file) {
      if (validFileType && !validFileType.includes(file.type)) {
        this.setError('error.wrong-file');
        noError = false;
      }
      if (maxFileSize && file.size > maxFileSize) {
        this.setError('error.to-large');
        noError = false;
      }
    } else {
      return false;
    }

    return noError;
  }

  private setError(path) {
    this.translate.get(path).subscribe(text => {
      if (this.error.value) {
        this.error.next(this.error.value + text);
      } else {
        this.error.next(text);
      }
    });
  }
}
