import { Pipe, PipeTransform } from '@angular/core';
import { Station } from 'src/app/models/station.model';

@Pipe({
  name: 'filterTable'
})
export class FilterTablePipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    console.log(1);

    if (items instanceof Station) {
      return items.filter((item) => {
        return (
          item.name.toLowerCase().includes(searchText) ||
          item.location.country.toLowerCase().includes(searchText) ||
          item.location.city.toLowerCase().includes(searchText) ||
          item.location.address.toLowerCase().includes(searchText) ||
          item.location.zipCode.toLowerCase().includes(searchText)
        );
      });
    } else {
      return items.filter((item) => {
        return (
          item.id.toString().toLowerCase().includes(searchText) ||
          item.sizeName.toLowerCase().includes(searchText)
        );
      });
    }
  }
}
