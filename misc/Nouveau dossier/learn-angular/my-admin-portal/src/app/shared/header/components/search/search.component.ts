import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  isShowInput: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleInput() {
    this.isShowInput = !this.isShowInput;
  }

}
