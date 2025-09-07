import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  fis = 'www.fisglobal.com';
  fisAbout = 'www.fisglobal.com/about';
  fisBlog = 'www.fisglobal.com/forum';

  constructor() { }

  ngOnInit(): void {
  }

}
