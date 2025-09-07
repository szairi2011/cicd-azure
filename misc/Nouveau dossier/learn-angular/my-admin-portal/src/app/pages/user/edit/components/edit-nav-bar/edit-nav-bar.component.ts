import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { EditUserEvent } from '../../models';

@Component({
  selector: 'app-edit-nav-bar',
  templateUrl: './edit-nav-bar.component.html',
  styleUrls: ['./edit-nav-bar.component.scss']
})
export class EditNavBarComponent implements OnInit {

  @Output() editTabChanged: EventEmitter<EditUserEvent> = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onTabChange(_event: MatTabChangeEvent) {
    this.editTabChanged.emit(
      {
        formPartIdx: _event.index,
        formPartName: _event.tab.textLabel
      });

    console.log("[EdiNavBarComponet] Dynamically loading edit user form part for tab: ", _event.tab.textLabel);
  }

}
