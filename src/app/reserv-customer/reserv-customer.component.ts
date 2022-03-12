import { HttpErrorResponse } from '@angular/common/http';
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
  public commands:Command[];
  public command:Command=new Command();
  public products:Stock[];
  msg='';
  msg1='';
  msg2='';
  customer='';
  public total:number;
  constructor(private service:ProductManagerService) { }

  ngOnInit(): void {
    this.getStock();
    this.customer=sessionStorage.getItem("guest");
    this.getCommand(this.customer);
  }

  public placeOrder(form:NgForm){
    this.service.customerPlaceOrder(this.reservation).subscribe(
      data=>{
        console.log("response received")
        this.msg1="your command has been sent successfully"
        this.msg="";
        this.getCommand(this.command.cname);
        form.reset();
      },
      (error:HttpErrorResponse)=>{
        console.log("exception occured")
        this.msg1="";
        this.msg=error.error.message;

      }
    )
    this.deleteCommand();
  }

  async saveCommand(form:NgForm){
    this.command.cname=this.customer;
    this.service.postCommand(this.command).subscribe(
      (response:Command[])=>{
        console.log(response);
        this.getCommand(this.customer);
        form.reset();
        this.msg2="";

      },
      (error:HttpErrorResponse)=>{
        console.log("exception occured")
        this.msg2=error.error.message;

      }
    )
     
  }
  public getCommand(cname:string){
    
    this.service.getCommand(cname).subscribe(
      (response:Command[])=>{
        this.reservation.products=response;
        this.commands=response;
        this.total=0;
        for (let com of this.commands) {
          this.total=this.total+com.price;
          
        }
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
  public deleteCom(id:number){
    this.service.deleteCom(id).subscribe(
      data=>{
      console.log("deleted successfuly");
      this.getCommand(this.customer);
    },
    error=>{
      console.log("delete failed")
    })
  }
  


  

 

}
