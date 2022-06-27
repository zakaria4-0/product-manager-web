import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminControlPageComponent } from './admin-control-page/admin-control-page.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminPlatformComponent } from './admin-platform/admin-platform.component';

import { CustomerCommandsComponent } from './customer-commands/customer-commands.component';
import { CustomerLoginRegistrationComponent } from './customer-login-registration/customer-login-registration.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerReclamationsComponent } from './customer-reclamations/customer-reclamations.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { KPIComponent } from './kpi/kpi.component';
import { ListReclamComponent } from './list-reclam/list-reclam.component';
import { MainComponent } from './main/main.component';

import { OurProductsComponent } from './our-products/our-products.component';

import { ReclamationComponent } from './reclamation/reclamation.component';
import { ReservCustomerLComponent } from './reserv-customer-l/reserv-customer-l.component';
import { StockProductComponent } from './stock-product/stock-product.component';



const routes: Routes = [
 
  {path:"main",component:MainComponent},
  {path:"admincontrolpage",component:AdminControlPageComponent},
  {path:"adminLogin",component:AdminLoginComponent},
  {path:"customerinfo",component:AdminPlatformComponent},
  {path:"customerLogin",component:CustomerLoginComponent},
  {path:"customerLoginRegistration",component:CustomerLoginRegistrationComponent},
  {path:"reservCustomerL",component:ReservCustomerLComponent},
  {path:"productStock",component:StockProductComponent},
  {path:"ourProducts",component:OurProductsComponent},
  {path:"customersList",component:CustomersListComponent},
  {path:"KPI",component:KPIComponent},
  {path:"reclamation",component:ReclamationComponent},
  {path:"reclamations",component:ListReclamComponent},
  {path:"customerCommands",component:CustomerCommandsComponent},
  {path:"customerReclamations",component:CustomerReclamationsComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

