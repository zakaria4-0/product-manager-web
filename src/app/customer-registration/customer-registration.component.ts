import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../customer';
import { ProductManagerService } from '../productManager.service';

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.css']
})
export class CustomerRegistrationComponent implements OnInit {
  public newCutomer:Customer=new Customer();
  msg="";

  constructor(private service:ProductManagerService, private router:Router) { }

  ngOnInit(): void {
  }

  public addCustomer(){
    this.service.registrationCustomer(this.newCutomer).subscribe(
      data=>{
        console.log("response received")
        this.router.navigate(["/reservCustomer"])

      },
      error=>{
        console.log("exception occured")
        this.msg="please give all youre informations"

      }
    )
  }

}
