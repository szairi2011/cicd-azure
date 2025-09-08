import { Component, OnInit, ViewChild } from '@angular/core';
import { IgxFilterOptions } from 'igniteui-angular';
import {ApiService} from "../services/api.service";
@Component({
  selector: 'app-new-joiners',
  templateUrl: './new-joiners.component.html',
  styleUrls: ['./new-joiners.component.scss']
})
export class NewJoinersComponent  {

  csvRecords: any;
  header: boolean = true;
  newjoiners: any;

  constructor(private serviceapi: ApiService) {
  }

  ngOnInit(): void {
    this.serviceapi.getNewjoiners().subscribe((result)=>this.newjoiners=result);
  }

  @ViewChild('fileImportInput') fileImportInput: any;

/*   fileChangeListener($event: any): void {

    const files = $event.srcElement.files;
    this.header = (this.header as unknown as string) === 'true' || this.header === true;

    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe({
        next: (result): void => {
          console.log('Result', result);
          this.csvRecords = result;
        },
        error: (error: NgxCSVParserError): void => {
          console.log('Error', error);
        }
      });
  } */





}
