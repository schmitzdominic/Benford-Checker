import {Component} from '@angular/core';

export enum UploadType {
  CSV,
  EXCEL
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  state: UploadType = UploadType.EXCEL;

  constructor() {
  }

  public get getUploadType(): typeof UploadType {
    return UploadType;
  }
}
