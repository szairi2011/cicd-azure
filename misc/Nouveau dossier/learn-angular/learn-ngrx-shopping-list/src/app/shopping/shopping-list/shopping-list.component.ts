import { AppState } from 'src/app/store/states/app.state';
import { LoadShoppingItemsAction } from './../../store/actions/shopping.actions';
import { DataSource } from '@angular/cdk/collections';
import { ShoppingItem } from './../../store/models/shopping-item.model';
import { Observable, BehaviorSubject, timer, of } from 'rxjs';
import { AddShoppingItemDialogComponent } from '../crud/add-shopping-item-dialog/add-shopping-item-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AfterViewInit, Component, ViewChild, ElementRef, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { tap, map, filter, delay, catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements AfterViewInit, OnInit {

  /* ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ]; */

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  displayedColumns: string[] = ['id', 'name', 'description'];
  // shoppingItems$: Observable<ShoppingItem[]>;
  // dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  dataSource: ShoppingListDataSource;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource = new ShoppingListDataSource(this.store);
    // this.store.dispatch(new LoadShoppingItemsAction());
    // this.loadShoppingItemsPage();
  }

  @ViewChild( MatPaginator ) paginator: MatPaginator;
  @ViewChild( MatSort ) sort: MatSort;

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;

    // To customize filtering amend the default filterPredicate

    /* this.dataSource.filterPredicate =
        (data: PeriodicElement, filter: string) => {
          return data.name.toLowerCase().includes(filter.toLowerCase()) // Case senstive filtering in this case
        }; */

    console.log('Paginator page index: ', this.paginator.pageIndex);
    console.log('Paginator page size: ', this.paginator.pageSize);

    /* timer(0, 10000).pipe(
      delay(1000),
      map((data) => {
        console.log('timer emitted', data);
        this.loadShoppingItemsPage();
        // this.store.dispatch(new LoadShoppingItemsAction());
      })
      )
    .subscribe(); */

    this.loadShoppingItemsPage();

    this.paginator.page.pipe(
      tap(() => this.loadShoppingItemsPage())
    ).subscribe();
  }

  loadShoppingItemsPage() {
    // this.dataSource.loadPageSlice(
    //   this.paginator.pageIndex,
    //   this.paginator.pageSize
    // );
    this.dataSource.loadShoppingItems(this.paginator);

  }

  /* applyFilter(filterStr: string) {
    filterStr = filterStr.trim();
    filterStr = filterStr.toLowerCase(); // MatTableDataSource filtering defaults to ower case comparison
    this.dataSource.filter = filterStr;
  } */

  addShoppingItem() {
    const dialogRef = this.dialog.open( AddShoppingItemDialogComponent, {
      width: '400px',
      height: '600px'
    } );
  }

  edit(id: string) {

  }

}

/* export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
} */

export class ShoppingListDataSource extends DataSource<any> {

  shoppingItemsSubject$ = new BehaviorSubject<ShoppingItem[]>([]);
  loadingSubject$ = new BehaviorSubject<boolean>(false);

  loading$ = this.loadingSubject$.asObservable()

  shoppingItemsCount: number = 10;

  constructor(private store: Store<AppState>) {
    super();
  }

  connect(): Observable<ShoppingItem[]> {
    return this.shoppingItemsSubject$.asObservable();
  }

  disconnect() {
    // this.shoppingItemsSubject$.complete();
    // this.loadingSubject$.complete();
  }

  loadShoppingItems(paginator: MatPaginator) {

    this.loadingSubject$.next(true);

    this.store.select(state => state.shopping.list).pipe(
      map((items: ShoppingItem[]) => items.slice(
        paginator.pageIndex,
        paginator.pageSize
      )),
      catchError(() => of([])),
      finalize(() => this.loadingSubject$.next(false))
    )
    .subscribe(items => {
      console.log('New state list', items);
      // changeDetectorRefs.detectChanges();
      this.shoppingItemsSubject$.next(items);
      // this.shoppingItemsCount = this.shoppingItemsSubject$.getValue().length;
      this.loadingSubject$.next(false);
    });

  }
}
