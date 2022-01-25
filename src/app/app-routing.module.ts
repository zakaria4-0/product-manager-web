import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminControlPageComponent } from './admin-control-page/admin-control-page.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminPlatformComponent } from './admin-platform/admin-platform.component';
import { BestSellingProductComponent } from './best-selling-product/best-selling-product.component';
import { CustomerLoginRegistrationComponent } from './customer-login-registration/customer-login-registration.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { MainComponent } from './main/main.component';
import { NewestProductComponent } from './newest-product/newest-product.component';
import { OurProductsComponent } from './our-products/our-products.component';
import { PopularProductComponent } from './popular-product/popular-product.component';
import { PromotionComponent } from './promotion/promotion.component';
import { ReservCustomerLComponent } from './reserv-customer-l/reserv-customer-l.component';
import { ReservCustomerComponent } from './reserv-customer/reserv-customer.component';
import { StockProductComponent } from './stock-product/stock-product.component';



const routes: Routes = [
 
  {path:"main",component:MainComponent},
  {path:"admincontrolpage",component:AdminControlPageComponent},
  {path:"adminLogin",component:AdminLoginComponent},
  {path:"customerinfo",component:AdminPlatformComponent},
  {path:"customerLogin",component:CustomerLoginComponent},
  {path:"customerLoginRegistration",component:CustomerLoginRegistrationComponent},
  {path:"customerRegistration",component:CustomerRegistrationComponent},
  {path:"reservCustomer",component:ReservCustomerComponent},
  {path:"reservCustomerL",component:ReservCustomerLComponent},
  {path:"productStock",component:StockProductComponent},
  {path:"ourProducts",component:OurProductsComponent},
  {path:"promotion",component:PromotionComponent},
  {path:"customersList",component:CustomersListComponent},
  {path:"popularProducts",component:PopularProductComponent},
  {path:"bestselling",component:BestSellingProductComponent},
  {path:"newestProducts",component:NewestProductComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

