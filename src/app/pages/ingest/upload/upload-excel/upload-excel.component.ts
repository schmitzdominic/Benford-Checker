import {Component, OnInit} from '@angular/core';
import * as XLSX from 'xlsx';
import {WorkBook} from 'xlsx';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ConvertService} from "../../../../services/convert/convert.service";
import {BenfordService} from "../../../../services/benford/benford.service";
import {Router} from "@angular/router";

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

  form: FormGroup;

  arrayBuffer: any;

  // Excel
  workBook: WorkBook;
  columns: string[];
  json: any;

  // Validators
  maxFileSize = 10485760;
  validFileType = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ]

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private convertService: ConvertService,
              private benford: BenfordService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      csv: ['']
    });
  }

  onFileChange(event) {
    const file = event.target.files[0];
    if (this.isValid(file)) {
      this.readFile(file);
    }
  }

  readFile(file) {
    let reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (e) => {
      this.workBook = this.createWorkbook(reader);
      this.state = this.getUploadExcelState.CHOOSE_WORKBOOK;
    }
  }

  onWorkBookChoose(event) {
    const workSheet = this.workBook.Sheets[event.option.value];
    this.json = XLSX.utils.sheet_to_json(workSheet, {raw: true});
    try {
      this.columns = Object.keys(this.json[0]);
      this.state = this.getUploadExcelState.CHOOSE_COLUMN;
    } catch (error) {
      // TODO: Message that no data found!
      console.log("NO DATA FOUND!")
    }
  }

  onColumnChoose(event) {
    const rawList = this.convertService.fromJsonToList(this.json, event.option.value);
    const result = this.benford.calculate(rawList);
    if (result) {
      this.router.navigate(['/result'], {state: {data: result}});
    } else {
      // TODO: Message that something is going wrong!
    }
  }

  createWorkbook(reader): WorkBook {
    this.arrayBuffer = reader.result;
    const data = new Uint8Array(this.arrayBuffer);
    let arr = [];
    for (let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    return XLSX.read(arr.join(""), {type: "binary"});
  }

  isValid(file): boolean {
    if (!file) {
      // TODO: Message
      console.log("Uploaded File is null or undefined")
      return false;
    }
    if (!this.validFileType.includes(file.type)) {
      // TODO: Message
      console.log("Wrong file type");
      return false;
    }

    if (file.size > this.maxFileSize) {
      // TODO: Message
      console.log("File to big! Max size is 10Mb");
      return false;
    }
    return true;
  }

  public get getUploadExcelState(): typeof UploadExcelState {
    return UploadExcelState;
  }

}
