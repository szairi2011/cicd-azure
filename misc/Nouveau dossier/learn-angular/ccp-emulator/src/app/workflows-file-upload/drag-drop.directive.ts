import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

// Reference - code from GitHub repo https://github.com/MariemChaabeni/angular7-upload-file

@Directive({
  selector: '[appDragDrop]'
})
export class DragDropDirective {

  @Output() fileDropped = new EventEmitter();

  @HostBinding('style.background-color') private background = '#f5fcff';
  @HostBinding('style.opacity') private opacity = '1';

  // Listen for dragover event
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    console.log('File drag over event fired ...');
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#9ecbec';
    this.opacity = '0.8';
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    console.log('File drag leave event fired ...');
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff';
    this.opacity = '1';
  }

  // Drop listener
  @HostListener('drop', ['$event']) public onDrop(evt) {
    console.log('File drop event fired ...');
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff';
    this.opacity = '1';
    const files = evt.dataTransfer.files;
    console.log('The number of dropped files: ' + files.length);
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }

  }

}
