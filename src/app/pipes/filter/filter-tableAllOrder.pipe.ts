import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTableAllOrders'
})
export class FilterTableAllOrders implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();

      return items.filter((item) => {
        return (
          item.receiverEmail.toLowerCase().includes(searchText) ||
          item.status.includes(searchText) ||
          item.orderDate.includes(searchText)
        );
      });
  }
}
