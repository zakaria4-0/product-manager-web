import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerLoginRegistrationComponent } from './customer-login-registration/customer-login-registration.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { FormsModule } from '@angular/forms';
import { ReservCustomerComponent } from './reserv-customer/reserv-customer.component';
import { ReservCustomerLComponent } from './reserv-customer-l/reserv-customer-l.component';
import { MainComponent } from './main/main.component';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { AdminPlatformComponent } from './admin-platform/admin-platform.component';
import { AdminControlPageComponent } from './admin-control-page/admin-control-page.component';
import { StockProductComponent } from './stock-product/stock-product.component';
import { OurProductsComponent } from './our-products/our-products.component';
import { PromotionComponent } from './promotion/promotion.component';




@NgModule({
  declarations: [
    AppComponent,
    CustomerLoginComponent,
    CustomerLoginRegistrationComponent,
    AdminLoginComponent,
    CustomerRegistrationComponent,
    ReservCustomerComponent,
    ReservCustomerLComponent,
    MainComponent,
    AdminPlatformComponent,
    AdminControlPageComponent,
    StockProductComponent,
    OurProductsComponent,
    PromotionComponent,
   
    
    
    
  ],
  
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
