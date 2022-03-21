import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerLoginRegistrationComponent } from './customer-login-registration/customer-login-registration.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { FormsModule } from '@angular/forms';
import { ReservCustomerLComponent } from './reserv-customer-l/reserv-customer-l.component';
import { MainComponent } from './main/main.component';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { AdminPlatformComponent } from './admin-platform/admin-platform.component';
import { AdminControlPageComponent } from './admin-control-page/admin-control-page.component';
import { StockProductComponent } from './stock-product/stock-product.component';
import { OurProductsComponent } from './our-products/our-products.component';
import { PromotionComponent } from './promotion/promotion.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { PopularProductComponent } from './popular-product/popular-product.component';
import { NewestProductComponent } from './newest-product/newest-product.component';
import { BestSellingProductComponent } from './best-selling-product/best-selling-product.component';
import { ProductManagerService } from './productManager.service';
import { KPIComponent } from './kpi/kpi.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { ListReclamComponent } from './list-reclam/list-reclam.component';
import { CustomerCommandsComponent } from './customer-commands/customer-commands.component';




@NgModule({
  declarations: [
    AppComponent,
    CustomerLoginComponent,
    CustomerLoginRegistrationComponent,
    AdminLoginComponent,
    ReservCustomerLComponent,
    MainComponent,
    AdminPlatformComponent,
    AdminControlPageComponent,
    StockProductComponent,
    OurProductsComponent,
    PromotionComponent,
    CustomersListComponent,
    PopularProductComponent,
    NewestProductComponent,
    BestSellingProductComponent,
    KPIComponent,
    ReclamationComponent,
    ListReclamComponent,
    CustomerCommandsComponent,
   
    
    
    
  ],
  
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    
  ],
  
  providers: [ProductManagerService],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
