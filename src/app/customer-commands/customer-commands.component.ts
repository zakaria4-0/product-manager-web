import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CustomerLogin } from '../customerLogin';
import { ProductManagerService } from '../productManager.service';
import { Reservation } from '../reservation';
import { Stock } from '../stock';

@Component({
  selector: 'app-customer-commands',
  templateUrl: './customer-commands.component.html',
  styleUrls: ['./customer-commands.component.css']
})
export class CustomerCommandsComponent implements OnInit {

  public reservations:Reservation[];
  public customer:CustomerLogin=new CustomerLogin();
  custPassword='';
  custName='';
  constructor(private service:ProductManagerService) { }

  ngOnInit(): void {
    this.custName=sessionStorage.getItem('custName');
    this.custPassword=sessionStorage.getItem('custPassword');
    this.getCustomerByNameAndPassword();
  }

  public getCustomerByNameAndPassword(){
    this.service.getCustomer(this.custName,this.custPassword).subscribe(
      (response:CustomerLogin)=>{
        this.customer=response;
        this.getReservationByEmail(this.customer.email);
      },
      error=>{
        console.log("exception occured");
      }
    )
  }

  public getReservationByEmail(email:string){
    this.service.getReservationByEmail(email).subscribe(
      (response:Reservation[])=>{
        this.reservations=response;
        for (let reserv of this.reservations) {
          
          for(let prod of reserv.products){
            this.service.getStockId(prod.name).subscribe(
              (response:number)=>{
                prod.codeArticle=response;
              }
            )
          }
          
        }
      },
      (error:HttpErrorResponse)=>{
        console.log(error.error.message);
      }
    )
  }

}
