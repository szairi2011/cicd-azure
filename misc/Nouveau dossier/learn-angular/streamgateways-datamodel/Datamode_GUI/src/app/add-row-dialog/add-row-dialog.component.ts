import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataModelComponent } from '../data-model/data-model.component';
import { DatamodelBean, DataModelService } from '../service/data/data-model.service';

@Component({
  selector: 'app-add-row-dialog',
  templateUrl: './add-row-dialog.component.html',
  styleUrls: ['./add-row-dialog.component.css']
})
export class AddRowDialogComponent implements OnInit {

  constructor(
    private datamodel:DataModelService,  public dialogRef: MatDialogRef<AddRowDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ) {}

  onNoClick(): void {
    this.dialogRef.close();
  };



  ngOnInit(): void {
  }

  addRow(attribute:string){
   // this.datamodelBean =new DatamodelBean;
    // this.datamodelBean.attribute = attribute;
    this.datamodel.saveData(attribute);
  }

}

