import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerLogin } from '../customerLogin';
import { ProductManagerService } from '../productManager.service';

@Component({
  selector: 'app-customer-login-registration',
  templateUrl: './customer-login-registration.component.html',
  styleUrls: ['./customer-login-registration.component.css']
})
export class CustomerLoginRegistrationComponent implements OnInit {

  public regCustomer:CustomerLogin=new CustomerLogin();
  msg='';

  constructor(private service:ProductManagerService, private router:Router) { }

  ngOnInit(): void {
  }

  public customerRegister(){
    this.service.registrationCustomerLogin(this.regCustomer).subscribe(
      data=>{
        console.log("response received");
        this.router.navigate(["/customerLogin"])
      },
      error=>{
        console.log("exception occured");
        this.msg="User with this email is already exists";
      }
    )
  }

}
