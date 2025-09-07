import { AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatamodelBean, DataModelService } from '../service/data/data-model.service';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AddRowDialogComponent } from '../add-row-dialog/add-row-dialog.component';

interface ValidationModel {
  id: number;
  val: string;
}

interface ModelMode {
  id: string;
  val: string;
}

interface Output {
  id: string;
  val: string;
}
@Component({
  selector: 'app-data-model',
  templateUrl: './data-model.component.html',
  styleUrls: ['./data-model.component.css']
})

export class DataModelComponent implements OnInit {

  functionalArea = 'BackOffice';
  validationModel: any;
  modelMode: any;
  market: any;
  output: any;
  show = false;
  filterValue = '';
  editable = false;
  errorMessage = '';

  functionalAreas = ['MiddleOffice', 'BackOffice', 'FrontOffice'];
  validationModels = [{ id: 0, name: 'Common' }, { id: 1, name: 'TradeNotificationMsg' }, { id: 2, name: 'RejectMsg' }];
  modelModes = [{ id: 'internalfull', val: 'Internal-Full' }, { id: 'client', val: 'Client' }, { id: 'full', val: 'Full' }];
  markets = ['LDM', 'LME', 'ABAXX'];
  outputs = [{ id: 'SA', val: 'Standalone' }, { id: 'CV', val: 'Clearvision' }];
  data: any[] = [];
  dataSource = new MatTableDataSource(this.data);
  datamodelBean:DatamodelBean = new DatamodelBean;
  selectedrow: any;
  url = '';
  valid = false;



  functionalAreaControl = new FormControl('', Validators.required);
  validationModelControl = new FormControl('', Validators.required);
  modelModeControl = new FormControl('', Validators.required);
  marketControl = new FormControl('', Validators.required);
  outputControl = new FormControl('', Validators.required);



  //displayedColumns: string[] = ['attribute', 'type', 'format', 'fixmlMapping', 'update'];
  displayedColumns: string[] = [];
  updateColumns: string[] = [];



  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(private dataModelService: DataModelService,public dialog: MatDialog) { }



  ngOnInit(): void {

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddRowDialogComponent, {
      width: '250px',
      data: {name: this.market, animal: this.market}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.market = result;
    });
  }

  formValidation() {
    if (this.market.length > 0 && this.modelMode.val.length > 0 && this.validationModel.id.length > 0 && this.output.length > 0) {
      this.valid = true;
    }
  }

  getUrl() {
    if (this.modelMode.id == 'full') {
      this.url = 'http://localhost:8080/datamodel/middleoffice/LDM/full';
    }
    else {
      this.url = 'http://localhost:8080/datamodel/middleoffice/';
      this.url = this.url + this.market + '/' + this.output.id + '/' + this.modelMode.id + '/' + this.validationModel.id;
    }
  }

  getdisplayedColumns() {
    if (this.modelMode.id == 'full') {
      this.displayedColumns = ['ID', 'SGW_Attribute', 'SGW_Type', 'Mandatory', 'SA_Format', 'FIXML_Field', 'SA_FIXML_Mapping', 'FIXML_Path', 'CV_Format', 'CV_FixTag', 'CV_Fix_Rules', 'Internal_Flexible', 'CV_FixTagName', 'Technical_Comments', '   '];
      console.log(this.displayedColumns);
    }
    else {
      this.displayedColumns = Object.keys(this.data[0]);
      this.updateColumns = ['update'];
      console.log(this.displayedColumns);
    }
    if (this.modelMode.id == 'client') {
      this.displayedColumns = ['ID', 'SGW_Attribute', 'FIXML_Field', 'FIXML_Path', 'Filter_Model', 'CV_FixTag', 'CV_Format', 'Row_Type', 'Technical_Comments', '   ']
      console.log(this.displayedColumns);
    }
  }

  getData() {
    this.show = true;
    this.dataModelService.getData().subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
  }

  fetchData() {
    this.getUrl();
    console.log(this.url);
    this.show = true;
    this.dataModelService.fetchData(this.url).subscribe(
      response => {this.handleSuccessfulResponse(response),window.scrollTo(0, 700);},
      error => this.handleErrorResponse(error)
    );
  }

  updateDataModel(modelId: any, dataModel: any) {
    this.dataModelService.updateData(modelId, dataModel).subscribe(
      data => {
        alert("Update Successful");
        this.fetchData();
      })
  }

  deleteDataModel(modelId: any) {
    if (window.confirm('Are sure you want to delete this item ?')) {
      this.dataModelService.deleteData(modelId).subscribe(
        data => {
          alert("Deleted");
          this.fetchData();
        })
    }
    this.getData();
  }



  handleSuccessfulResponse(response: any) {
    this.data = response;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.sort;
    this.getdisplayedColumns();
  }

  handleErrorResponse(error: any) {
    this.errorMessage = error;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  highlight(highlighted: boolean) {
    highlighted = !highlighted;
  }

  selected(row: any) {
    this.selectedrow = row.ID;
  }

  selectRow(element: any) {
    if (this.selectedrow === element.ID) {
      return true;
    }
    return false;
  }

  
}


