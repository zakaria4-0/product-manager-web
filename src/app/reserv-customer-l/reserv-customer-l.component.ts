import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Command } from '../command';
import { Product } from '../product';
import { ProductManagerService } from '../productManager.service';
import { Reservation } from '../reservation';
import { Stock } from '../stock';

@Component({
  selector: 'app-reserv-customer-l',
  templateUrl: './reserv-customer-l.component.html',
  styleUrls: ['./reserv-customer-l.component.css']
})
export class ReservCustomerLComponent implements OnInit {

  public reservation:Reservation=new Reservation();
  public commands:Command[];
  public command:Command=new Command();
  public products:Stock[];
  public total:number;
  msg='';
  msg1='';
  msg2='';
  custName='';

  constructor(private service:ProductManagerService) { }

  ngOnInit(): void {
    this.getStock();
    this.custName=sessionStorage.getItem('custName');
    this.getCommand(this.custName);
  }

  public placeOrder(form:NgForm){
    this.service.customerLoginPlaceOrder(this.reservation).subscribe(
      data=>{
        console.log("response received")
        this.msg="";
        this.msg1="your command has been sent successfully"
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
    this.command.cname=this.custName;
    this.service.postCommandLogin(this.command).subscribe(
      (response:Command[])=>{
        console.log(response);
        this.getCommand(this.custName);
        form.reset();
        this.msg2=""
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
        console.log("deleted successfuly received")
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
      this.getCommand(this.custName);
    },
    error=>{
      console.log("delete failed")
    })
  }

}
