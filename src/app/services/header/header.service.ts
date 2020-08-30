import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private fold = new BehaviorSubject(false);
  private dark = new BehaviorSubject(false);

  currentFoldState = this.fold.asObservable();
  currentDarkState = this.dark.asObservable();

  constructor() {
  }

  foldHeader(state): void {
    this.fold.next(state);
  }

  darkToolbar(state): void {
    this.dark.next(state);
  }
}
