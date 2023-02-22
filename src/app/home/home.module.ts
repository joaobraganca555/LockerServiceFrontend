import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderComponent } from './order/order.component';
import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';
import { StationsComponent } from './stations/stations.component';
import { AccountComponent } from './account/account.component';
import { AddlockerComponent } from './add_locker/addlocker.component';
import { CollectOrderComponent } from './collect-order/collect-order.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { HoldOrderComponent } from './hold-order/hold-order.component';
import { SearchStationLockerComponent } from './search-station-locker/search-station-locker.component';
import { TransportComponent } from './transport/transport.component';
import { LockerScreenComponent } from './locker-screen/locker-screen.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';

@NgModule({
  declarations: [
    HomeComponent,
    OrderComponent,
    StationsComponent,
    CollectOrderComponent,
    AccountComponent,
    AddlockerComponent,
    CreateUserComponent,
    HoldOrderComponent,
    OrderComponent,
    SearchStationLockerComponent,
    TransportComponent,
    LockerScreenComponent,
    AllOrdersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class HomeModule {}
