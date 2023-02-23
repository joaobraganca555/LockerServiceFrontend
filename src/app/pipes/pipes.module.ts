import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter/filter.pipe';
import { PaginationPipe } from './pagination/pagination.pipe';
import { FilterTablePipe } from './filter/filter-table.pipe';
import { FilterTableRetainPipe } from './filter/filter-tableRetain.pipe';
import { FilterTableAllOrders } from './filter/filter-tableAllOrder.pipe';
import { FilterTableTransporterPipe } from './filter/filter-tableTransporter.pipe';

@NgModule({
  declarations: [FilterPipe, PaginationPipe, FilterTablePipe,FilterTableRetainPipe,FilterTableAllOrders, FilterTableTransporterPipe],
  exports: [FilterPipe, PaginationPipe, FilterTablePipe,FilterTableRetainPipe,FilterTableAllOrders, FilterTableTransporterPipe],
  imports: [CommonModule]
})
export class PipesModule {}
