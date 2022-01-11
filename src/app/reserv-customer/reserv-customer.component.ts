import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Command } from '../command';
import { Product } from '../product';
import { ProductManagerService } from '../productManager.service';
import { Reservation } from '../reservation';
import { Stock } from '../stock';

@Component({
  selector: 'app-reserv-customer',
  templateUrl: './reserv-customer.component.html',
  styleUrls: ['./reserv-customer.component.css']
})
export class ReservCustomerComponent implements OnInit {
  public reservation:Reservation=new Reservation();
  public commands:Product[];
  public command:Command=new Command();
  public products:Stock[];
  msg='';
  msg1='';
  msg2='';

  constructor(private service:ProductManagerService) { }

  ngOnInit(): void {
    this.getStock();
    
  }

  public placeOrder(form:NgForm){
    this.service.customerPlaceOrder(this.reservation).subscribe(
      data=>{
        console.log("response received")
        this.msg1="your command has been sent successfully"
        this.getCommand(this.command.cname);
        form.reset();
      },
      error=>{
        console.log("exception occured")
        this.msg="name or email doesn't exists"

      }
    )
    this.deleteCommand();
  }

  async saveCommand(form:NgForm){
    this.service.postCommand(this.command).subscribe(
      (response:Command[])=>{
        console.log(response);
        this.getCommand(this.command.cname);
        form.reset();

      },
      error=>{
        console.log("exception occured")
        this.msg2="Invalid customer-name/product-name or Sold Out"

      }
    )
     
  }
  public getCommand(cname:string){
    
    this.service.getCommand(cname).subscribe(
      (response:Product[])=>{
        this.reservation.products=response;
        this.commands=response;
        console.log(this.reservation.products);

      },
      error=>{
        console.log("exception occured")

      }
    )
    
  }
  public deleteCommand(){
    this.service.deleteCommand().subscribe(
      data=>{
        console.log("deleted successfuly ")
      },
      error=>{
        console.log("delete failed")
      }
    )
  }
  public getStock(){
    this.service.getStock().subscribe(
      (response:Stock[]) =>{
        this.products=response;
        console.log(this.products)
      },
      error =>{
        console.log("exception occured")
      }
    )
  }

  


  

 

}
