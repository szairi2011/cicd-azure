import { Observable, of } from 'rxjs';
import { EditUserEvent } from './../../models/edit-user-event';
import { Component, OnInit, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { EditUserFormPartLoaderComponent } from '../../components/edit-user-form-part-loader/edit-user-form-part-loader.component';

@Component({
  selector: 'app-user-edit-page',
  templateUrl: './user-edit-page.component.html',
  styleUrls: ['./user-edit-page.component.scss']
})
export class UserEditPageComponent implements OnInit {

  // Defaults to first edit user tab
  formPartIdx$: Observable<number> = of(1);
  @ViewChild(EditUserFormPartLoaderComponent) partLoader: EditUserFormPartLoaderComponent;

  constructor() { }

  ngOnInit(): void {

  }

  setFormPartIdx(_event: EditUserEvent) {
    console.log("[UserEditPageComponent] Setting form part idx to: ", _event.formPartIdx);

    this.partLoader.editFormPartIdx = _event.formPartIdx;
    this.partLoader.loadComponent();
  }

}
