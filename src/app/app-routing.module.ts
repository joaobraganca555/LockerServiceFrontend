import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { OrderComponent } from './home/order/order.component';
import { HomeComponent } from './home/home.component';
import { StationsComponent } from './home/stations/stations.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { TransportComponent } from './home/transport/transport.component';
import { SearchStationLockerComponent } from './home/search-station-locker/search-station-locker.component';
import { HoldOrderComponent } from './home/hold-order/hold-order.component';
import { CreateUserComponent } from './home/create-user/create-user.component';
import { AddlockerComponent } from './home/add_locker/addlocker.component';
import { AccountComponent } from './home/account/account.component';
import { CollectOrderComponent } from './home/collect-order/collect-order.component';
import { AdminGuard } from './guards/admin/admin.guard';
import { ClientGuard } from './guards/client/client.guard';
import { EmployeeGuard } from './guards/employee/employee.guard';
import { TransporterGuard } from './guards/transporter/transporter.guard';
import { LockerScreenComponent } from './home/locker-screen/locker-screen.component';
import { AllOrdersComponent } from './home/all-orders/all-orders.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'order',
        canActivate: [ClientGuard],
        component: OrderComponent
      },
      {
        path: 'allOrders',
        canActivate: [ClientGuard],
        component: AllOrdersComponent
      },
      {
        path: 'stations',
        canActivate: [AdminGuard],
        component: StationsComponent
      },
      {
        path: 'account',
        component: AccountComponent
      },
      {
        path: 'addlocker',
        canActivate: [AdminGuard],
        component: AddlockerComponent
      },
      {
        path: 'createUser',
        canActivate: [AdminGuard],
        component: CreateUserComponent
      },
      {
        path: 'holdOrder',
        canActivate: [EmployeeGuard],
        component: HoldOrderComponent
      },
      {
        path: 'searchStationLocker',
        component: SearchStationLockerComponent
      },
      {
        path: 'transport',
        canActivate: [TransporterGuard],
        component: TransportComponent
      }
    ]
  },
  {
    path: 'collectOrder/:token',
    component: CollectOrderComponent
  },
  {
    path: 'lockerScreen/:id',
    component: LockerScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
