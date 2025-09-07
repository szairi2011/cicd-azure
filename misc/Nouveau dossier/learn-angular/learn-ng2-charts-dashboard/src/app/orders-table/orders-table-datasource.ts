import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface OrdersTableItem {
  name: string;
  id: number;
  status?: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: OrdersTableItem[] = [
  {id: 1, name: 'Hydrogen', status: 'pending'},
  {id: 2, name: 'Helium', status: 'pending'},
  {id: 3, name: 'Lithium', status: 'delivered'},
  {id: 4, name: 'Beryllium', status: 'pending'},
  {id: 5, name: 'Boron', status: 'pending'},
  {id: 6, name: 'Carbon', status: 'delivered'},
  {id: 7, name: 'Nitrogen', status: 'pending'},
  {id: 8, name: 'Oxygen', status: 'pending'},
  {id: 9, name: 'Fluorine', status: 'shipped'},
  {id: 10, name: 'Neon', status: 'pending'},
  {id: 11, name: 'Sodium', status: 'pending'},
  {id: 12, name: 'Magnesium', status: 'shipped'},
  {id: 13, name: 'Aluminum', status: 'pending'},
  {id: 14, name: 'Silicon', status: 'delivered'},
  {id: 15, name: 'Phosphorus', status: 'pending'},
  {id: 16, name: 'Sulfur', status: 'pending'},
  {id: 17, name: 'Chlorine', status: 'shipped'},
  {id: 18, name: 'Argon', status: 'delivered'},
  {id: 19, name: 'Potassium', status: 'pending'},
  {id: 20, name: 'Calcium', status: 'pending'},
];

/**
 * Data source for the OrdersTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class OrdersTableDataSource extends DataSource<OrdersTableItem> {
  data: OrdersTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<OrdersTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: OrdersTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: OrdersTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
