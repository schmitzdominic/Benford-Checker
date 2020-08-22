import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {OnExecuteData, ReCaptchaV3Service} from "ng-recaptcha";
import {Subscription} from "rxjs";
import {RecaptchaService} from "../../../services/recaptcha/recaptcha.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {

  public readonly executionLog: OnExecuteData[] = [];

  recaptchaExecute: Subscription;
  recaptchaOnExecute: Subscription;
  recentToken = '';
  form: FormGroup;
  maxFileSize = 10485760;
  validFileType = [
    'application/vnd.ms-excel'
  ]

  constructor(private formBuilder: FormBuilder,
              private recaptchaV3Service: ReCaptchaV3Service,
              private recaptchaService: RecaptchaService,
              private router: Router) { }

  ngOnInit(): void {
    this.recaptchaOnExecute = this.recaptchaV3Service.onExecute
      .subscribe((data) => {
        this.executionLog.push(data);
        // TODO: Validate through Google Backend!

      });
    this.recaptchaExecute = this.recaptchaV3Service.execute('enableUploadButton').subscribe(token => this.recentToken = token);
    this.form = this.formBuilder.group({
      csv: ['']
    });
  }

  ngOnDestroy() {
    if (this.recaptchaExecute) {
      this.recaptchaExecute.unsubscribe();
    }
    if (this.recaptchaOnExecute) {
      this.recaptchaOnExecute.unsubscribe();
    }
  }

  onFileChange(event) {
    const file = event.target.files[0];
    console.dir(file);
    if (this.isValid(file)) {
      this.readFile(file);
    }
  }

  readFile(file) {
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      let csvData = reader.result;

      // TODO:
      // Import captcha
      // Create a Service to calculate Benford
      // Proceed a loading spinner during calculating
      let csvRecordsArray = (<string>csvData).split(/\r\n|\n|,/);
      csvRecordsArray.forEach(data => {
        if (Number(data)) {
          console.log("NUMERIC: " + data);
        }
      })
      console.dir(csvRecordsArray);

      this.router.navigate(['/result']);
    }
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

    if (file.legth > this.maxFileSize) {
      // TODO: Message
      console.log("File to big! Max size is 10Mb");
      return false;
    }
    return true;
  }



}
