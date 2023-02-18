import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { OrderComponent } from './order/order.component';
import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';
import { StationsComponent } from './stations/stations.component';

@NgModule({
  declarations: [HomeComponent, OrderComponent, StationsComponent],
  imports: [CommonModule, FormsModule, PipesModule, SharedModule]
})
export class HomeModule {}
