import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UploadService} from "../../../services/upload/upload.service";
import {catchError, map} from "rxjs/operators";
import {HttpErrorResponse, HttpEventType} from "@angular/common/http";
import {of} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  form: FormGroup;
  error: string;
  uploadResponse = { status: '', message: '', filePath: '' };

  value = 'Clear me';

  constructor(private formBuilder: FormBuilder, private uploadService: UploadService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      avatar: ['']
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadService.upload(file).subscribe(
        (res) => this.uploadResponse = res,
        (err) => this.error = err
      );
    }
  }

}
