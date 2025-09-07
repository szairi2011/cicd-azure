import { selectAllShoppingItems } from './../../store/selectors/shopping.selectors';
import { UpdateShoppingItemDialogComponent } from '../crud/update-shopping-item-dialog/update-shopping-item-dialog.component';
import { DeleteShoppingItemAction } from './../../store/actions/shopping.actions';
import { AddShoppingItemDialogComponent } from '../crud/add-shopping-item-dialog/add-shopping-item-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { ShoppingItem } from './../../store/models/shopping-item.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/states/app.state';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shopping-list-mat-table-ds',
  templateUrl: './shopping-list-mat-table-ds.component.html',
  styleUrls: ['./shopping-list-mat-table-ds.component.scss']
})
export class ShoppingListMatTableDsComponent implements AfterViewInit, OnInit {


  displayedColumns = ['id', 'name', 'description', 'actions'];

  shoppingList: ShoppingItem[] = [];

  // dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  dataSource: MatTableDataSource<ShoppingItem>;


  constructor(
    private store: Store<AppState>,
    private matDialog: MatDialog) {}

  @ViewChild( MatPaginator ) paginator: MatPaginator;
  @ViewChild( MatSort ) sort: MatSort;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.shoppingList);

    this.store.select(selectAllShoppingItems).pipe(
      map((items) => this.shoppingList = items)
    ).subscribe(() => this.dataSource.data = this.shoppingList);
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterStr: string) {
    filterStr = filterStr.trim();
    filterStr = filterStr.toLowerCase(); // MatTableDataSource filtering defaults to ower case comparison
    this.dataSource.filter = filterStr;
  }

  addNew() {
    const dialogRef = this.matDialog.open(AddShoppingItemDialogComponent, {
      width: '500px',
      height: '600px',
      data: {item: ShoppingItem}
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('Mat dialog after close result: ', result);
      if (result == 1) {
        // Do extra stuff if needed when data gets submitted ...
      }
    });
  }

  edit(item: ShoppingItem) {

    const dialogRef = this.matDialog.open(UpdateShoppingItemDialogComponent, {
      width: '500px',
      height: '600px',
      data: {
        id: item.id,
        name: item.name,
        description: item.description,
        isFavorite: item.isFavorite ? item.isFavorite: "false",
        isPurchased: item.isPurchased ? item.isPurchased: "false"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Mat dialog after close result: ', result);
      if (result == 1) {
        // Do extra stuff if needed when data gets submitted ...
      }
    });
  }

  delete(id: string) {
    this.store.dispatch(new DeleteShoppingItemAction(id));
  }

  /* ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, color: 'blue'},
    {position: 2, name: 'Helium', weight: 4.0026, color: 'purple'},
    {position: 3, name: 'Lithium', weight: 6.941, color: 'yellow'},
    {position: 4, name: 'Beryllium', weight: 9.0122, color: 'red'},
    {position: 5, name: 'Boron', weight: 10.811, color: 'teal'},
    {position: 1, name: 'Hydrogen', weight: 1.0079, color: 'blue'},
    {position: 2, name: 'Helium', weight: 4.0026, color: 'red'},
    {position: 3, name: 'Lithium', weight: 6.941, color: 'yellow'},
    {position: 4, name: 'Beryllium', weight: 9.0122, color: 'blue'},
    {position: 5, name: 'Boron', weight: 10.811, color: 'indigo'},
    {position: 1, name: 'Hydrogen', weight: 1.0079, color: 'maroon'},
    {position: 2, name: 'Helium', weight: 4.0026, color: 'blue'},
    {position: 3, name: 'Lithium', weight: 6.941, color: 'pink'},
    {position: 4, name: 'Beryllium', weight: 9.0122, color: 'yeallow'},
    {position: 5, name: 'Boron', weight: 10.811, color: 'teal'},
    {position: 1, name: 'Hydrogen', weight: 1.0079, color: 'cyan'},
    {position: 2, name: 'Helium', weight: 4.0026, color: 'green'},
    {position: 3, name: 'Lithium', weight: 6.941, color: 'blue'},
    {position: 4, name: 'Beryllium', weight: 9.0122, color: 'red'},
    {position: 5, name: 'Boron', weight: 10.811, color: 'teal'}
  ]; */

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol?: string;
  color?: string;
}

