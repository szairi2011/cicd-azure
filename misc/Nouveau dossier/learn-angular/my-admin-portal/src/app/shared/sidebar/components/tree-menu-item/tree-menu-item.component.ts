import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tree-menu-item',
  templateUrl: './tree-menu-item.component.html',
  styleUrls: ['./tree-menu-item.component.scss']
})
export class TreeMenuItemComponent implements OnInit {

  @Input() parent: string;
  @Input() children: NavItemChild[];
  showSubmenu: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}

export interface NavItemChild {
    label: string;
    path: string;
}
