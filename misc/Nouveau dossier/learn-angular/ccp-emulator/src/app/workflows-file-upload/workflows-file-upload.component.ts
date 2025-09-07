import { Component, OnInit } from '@angular/core';
import { FileUploadService } from './file-upload.service';

@Component({
  selector: 'app-workflows-file-upload',
  templateUrl: './workflows-file-upload.component.html',
  styleUrls: ['./workflows-file-upload.component.css']
})
export class WorkflowsFileUploadComponent implements OnInit {

  // tslint:disable-next-line: new-parens
  selectedFiles: File[] = [];

  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  handleFileInput(files: FileList): void {
    if (files) {
      for (let index = 0; index < files.length; index++) {
        this.selectedFiles.push(files.item(index));
      }
      console.log(`Selected ${this.selectedFiles.length} file(s) to upload ...`);
    }
  }

  handleFileUpload(event): void {
    if (this.selectedFiles.length >= 1) {
      this.fileUploadService.uploadFiles(this.selectedFiles)
      .subscribe(
        data => {
          console.log(data);
          alert(`Received response from Flask app: ` + data);
        },
        error => {
          console.log(error);
          alert(`Received error from Flask app: ` + error);
        }
      );
    }
    else {
      console.error('Please select files to upload, and try again');
    }
  }

  deleteAttachment(idx): void {
    this.selectedFiles.splice(idx, 1);
  }

}
