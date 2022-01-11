import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerLogin } from '../customerLogin';
import { ProductManagerService } from '../productManager.service';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent implements OnInit {
  public customerLog:CustomerLogin=new CustomerLogin();
  msg='';

  constructor(private service:ProductManagerService, private router:Router) { }

  ngOnInit(): void {
  }

  public customerLogin(){
    this.service.loginCustomer(this.customerLog).subscribe(
      data=>{
        console.log("response received");
        this.router.navigate(["/reservCustomerL"]);
      },
      error=>{
        console.log("exception occured");
        this.msg="please enter a valid name and password";

      }
    )
  }

}
