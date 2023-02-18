import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter/filter.pipe';

@NgModule({
  declarations: [FilterPipe],
  exports: [FilterPipe],
  imports: [CommonModule]
})
export class PipesModule {}
