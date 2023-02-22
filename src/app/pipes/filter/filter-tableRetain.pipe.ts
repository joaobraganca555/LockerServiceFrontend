import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTableRetain'
})
export class FilterTableRetainPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();

      return items.filter((item) => {
        return (
          item.receiverEmail.toLowerCase().includes(searchText) ||
          item.stationName.toLowerCase().includes(searchText) 
        );
      });
  }
}
