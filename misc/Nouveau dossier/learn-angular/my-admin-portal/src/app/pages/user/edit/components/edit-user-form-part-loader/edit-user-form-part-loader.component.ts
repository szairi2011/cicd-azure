import { EditUserEvent } from './../../models/edit-user-event';
import { Component, OnInit, ViewChild, Input, ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { EditPartLoaderDirective } from '../../directives';
import { FormPartItem, IEditFormPartComponent } from '../../models';
import { EditUserService } from '../../services';

@Component({
  selector: 'app-edit-user-form-part-loader',
  templateUrl: './edit-user-form-part-loader.component.html',
  styleUrls: ['./edit-user-form-part-loader.component.scss']
})
export class EditUserFormPartLoaderComponent implements OnInit {

  @Input() editFormPartIdx: number = 0;
  @ViewChild(EditPartLoaderDirective, { static: true }) editPartHost!: EditPartLoaderDirective;

  formParts: FormPartItem[];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private editUserService: EditUserService
  ) { }

  ngOnInit(): void {
    this.editUserService.initFormParts();
    this.loadComponent();
  }

  loadComponent() {
    console.log("[EditUserFormPartLoader] Loading / Reloading form part for idx: ", this.editFormPartIdx);
    const formPartItem = this.editUserService.loadFormPart(this.editFormPartIdx);

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(formPartItem.component);

    const viewContainerRef = this.editPartHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<IEditFormPartComponent>(componentFactory);
    componentRef.instance.data = formPartItem.data;
  }

  handleTabChange(_event: EditUserEvent) {
    this.editFormPartIdx = _event.formPartIdx;
    this.loadComponent();
  }

}
