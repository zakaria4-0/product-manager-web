import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CustomerLogin } from '../customerLogin';
import { ProductManagerService } from '../productManager.service';
import { Reclamation } from '../reclamation';

@Component({
  selector: 'app-customer-reclamations',
  templateUrl: './customer-reclamations.component.html',
  styleUrls: ['./customer-reclamations.component.css']
})
export class CustomerReclamationsComponent implements OnInit {
  reclamations:Reclamation[];
  custName='';
  custPassword='';
  constructor(private service:ProductManagerService) { }

  ngOnInit(): void {
    this.custName=sessionStorage.getItem('custName');
    this.custPassword=sessionStorage.getItem('custPassword');
    this.getCustomerByNameAndPassword();
  }
  public getCustomerByNameAndPassword(){
    this.service.getCustomer(this.custName,this.custPassword).subscribe(
      (response:CustomerLogin)=>{
        this.getReclamationByEmail(response.email);
      },
      error=>{
        console.log("exception occured");
      }
    )
  }
  public getReclamationByEmail(email:string){
    this.service.getRecalamtionByEmail(email).subscribe(
      (response:Reclamation[])=>{
        this.reclamations=response;
      },
      (error:HttpErrorResponse)=>{
        console.log(error.error.message);
      }
      
    )
  }

}
