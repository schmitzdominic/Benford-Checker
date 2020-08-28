import {Component, OnInit} from '@angular/core';
import {ConvertService} from "../../../../services/convert/convert.service";
import {BenfordService} from "../../../../services/benford/benford.service";
import {Result} from "../../../../models/result.model";
import {Router} from "@angular/router";
import {OptionsService} from "../../../../services/options/options.service";
import {OptionTypes} from "../../../../models/option-types.model";
import {TranslateService} from "@ngx-translate/core";
import {ValidatorService} from "../../../../services/validator/validator.service";

@Component({
  selector: 'app-upload-csv',
  templateUrl: './upload-csv.component.html',
  styleUrls: ['./upload-csv.component.scss']
})
export class UploadCsvComponent implements OnInit {

  result: Result;
  error;

  // Validators
  maxFileSize = 10485760;
  validFileType = [
    'application/vnd.ms-excel'
  ]

  constructor(
    private router: Router,
    private translate: TranslateService,
    private validator: ValidatorService,
    private optionsService: OptionsService,
    private convert: ConvertService,
    private benford: BenfordService) {
  }

  ngOnInit(): void {
    this.optionsService.changeOption(OptionTypes.CSV);
    this.validator.currentError.subscribe(error => {
      this.error = error;
    });
  }

  readFile(file) {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const rawList = this.convert.fromTextToList(reader.result);
      this.result = this.benford.calculate(rawList);
      if (this.result) {
        this.router.navigate(['/result'], {state: {data: this.result}});
      } else {
        this.translate.get('error.unknown').subscribe(error => {
          this.error = error;
        });
      }
    }
  }

  onFileChange(event) {
    const file = event.target.files[0];
    if (this.validator.isValidAppend(file, this.validFileType, this.maxFileSize)) {
      this.readFile(file);
    }
  }
}
