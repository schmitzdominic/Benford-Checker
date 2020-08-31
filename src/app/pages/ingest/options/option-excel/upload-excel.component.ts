import {Component, OnInit} from '@angular/core';
import * as XLSX from 'xlsx';
import {WorkBook} from 'xlsx';
import {ConvertService} from '../../../../services/convert/convert.service';
import {BenfordService} from '../../../../services/benford/benford.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {ValidatorService} from '../../../../services/validator/validator.service';

export enum UploadExcelState {
  UPLOAD,
  CHOOSE_WORKBOOK,
  CHOOSE_COLUMN
}

@Component({
  selector: 'app-upload-excel',
  templateUrl: './upload-excel.component.html',
  styleUrls: ['./upload-excel.component.scss']
})
export class UploadExcelComponent implements OnInit {

  state: UploadExcelState = UploadExcelState.UPLOAD;

  arrayBuffer: any;
  error;

  // Excel
  workBook: WorkBook;
  columns: string[];
  json: any;

  // Validators
  maxFileSize = 10485760;
  validFileType = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];

  constructor(private router: Router,
              private translate: TranslateService,
              private validator: ValidatorService,
              private convertService: ConvertService,
              private benford: BenfordService) {
  }

  ngOnInit(): void {
    this.validator.currentError.subscribe(error => {
      this.error = error;
    });
  }

  onFileChange(event): void {
    const file = event.target.files[0];
    if (this.validator.isValidAppend(file, this.validFileType, this.maxFileSize)) {
      this.readFile(file);
    }
  }

  readFile(file): void {
    this.error = undefined;
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (e) => {
      this.workBook = this.createWorkbook(reader);
      this.state = this.getUploadExcelState.CHOOSE_WORKBOOK;
    };
  }

  onWorkBookChoose(event): void {
    const workSheet = this.workBook.Sheets[event.option.value];
    this.json = XLSX.utils.sheet_to_json(workSheet, {raw: true});
    try {
      this.columns = Object.keys(this.json[0]);
      this.state = this.getUploadExcelState.CHOOSE_COLUMN;
      this.error = undefined;
    } catch (error) {
      this.translate.get('error.no-columns').subscribe(error => {
        this.error = error;
      });
    }
  }

  onColumnChoose(event): void {
    const rawList = this.convertService.fromJsonToList(this.json, event.option.value);
    const result = this.benford.calculate(rawList);
    if (result) {
      this.router.navigate(['/result'], {state: {data: result}});
    } else {
      this.translate.get('error.unknown').subscribe(error => {
        this.error = error;
      });
    }
  }

  createWorkbook(reader): WorkBook {
    this.arrayBuffer = reader.result;
    const data = new Uint8Array(this.arrayBuffer);
    const arr = [];
    for (let i = 0; i !== data.length; ++i) { arr[i] = String.fromCharCode(data[i]); }
    return XLSX.read(arr.join(''), {type: 'binary'});
  }

  public get getUploadExcelState(): typeof UploadExcelState {
    return UploadExcelState;
  }
}
