import {  OnInit } from '@angular/core';
import { Component, AfterViewInit, ViewChild, ElementRef  } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements AfterViewInit  {
 

   constructor(
        private sanitizer: DomSanitizer
       ) { }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }


}
