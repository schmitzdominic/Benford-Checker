import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  form: FormGroup;
  maxFileSize = 10485760;
  validFileType = [
    'application/vnd.ms-excel'
  ]

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      csv: ['']
    });
  }

  onFileChange(event) {
    const file = event.target.files[0];
    console.dir(file);
    if (this.isValid(file)) {


      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        let csvData = reader.result;

        // TODO:
        // Import captcha and limit to 10mb files
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
  }

  isValid(file): boolean {
    if (!this.validFileType.includes(file.type)) {
      return false;
    }

    if (file.legth > this.maxFileSize) {
      // TODO: Popup Message
      console.log("File to big! Max size is 10Mb")
      return false;
    }
    return true;
  }



}
