import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nested-nav-item',
  templateUrl: './nested-nav-item.component.html',
  styleUrls: ['./nested-nav-item.component.scss']
})
export class NestedNavItemComponent implements OnInit {

  @Input() parent: string;
  @Input() children: NavItemChild[];
  showSubmenu: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}

export interface NavItemChild {
    name: string;
    url: string;
}
