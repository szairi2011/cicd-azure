import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[editPartHost]'
})
export class EditPartLoaderDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
