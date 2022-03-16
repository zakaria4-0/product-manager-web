import { Component, OnInit } from '@angular/core';
import { CustomerLogin } from '../customerLogin';
import { ProductManagerService } from '../productManager.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {
  public customers:CustomerLogin[]=[];
  userName='';

  constructor(private service:ProductManagerService) { }

  ngOnInit(): void {
    this.getCustomers();
    this.userName=sessionStorage.getItem('loggedUser');
  }
  public getCustomers(){
    this.service.getCustomerLogins().subscribe(
      (Response:CustomerLogin[])=>{
        for(const customer of Response){
          this.customers.push(customer);
          }
          console.log(this.customers);
      },
      error=>{
      console.log("exception occured");     
      }
    )
  }
  public searchEmployees(key: any):void{
    const results:CustomerLogin[]=[];
    for(const customer of this.customers){
      if(customer.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 
      || customer.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || customer.phoneNumber.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ){
        results.push(customer);
      }
    }
    this.customers=results;
    if(results.length==0 || !key){
      this.getCustomers();
    }
  }
  public cutomersPdf(){
    this.service.customersPdf().subscribe(
      (data:Blob)=>{
        var file = new Blob([data], { type: 'application/pdf' })
        var fileURL = URL.createObjectURL(file);
        //window.open(fileURL); 
          var a         = document.createElement('a');
          a.href        = fileURL; 
          a.target      = '_blank';
          a.download    = 'List-of-customers.pdf';
          document.body.appendChild(a);
          a.click();
        console.log("pdf generated successfully")
      },
      error=>{
        console.log("pdf failed to generate")
      }
    )
  }

}
