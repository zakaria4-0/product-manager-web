import { Component, OnInit } from '@angular/core';
import { OrderResponse } from '../orderResponse';
import { ProductManagerService } from '../productManager.service';

@Component({
  selector: 'app-admin-platform',
  templateUrl: './admin-platform.component.html',
  styleUrls: ['./admin-platform.component.css']
})
export class AdminPlatformComponent implements OnInit {
  public customerinfo:OrderResponse[];

  constructor(private service:ProductManagerService) { }

  ngOnInit(): void {
    this.getInfo();
  }

  public getInfo(){
    this.service.getInfo().subscribe(
      (response:OrderResponse[])=>{
        this.customerinfo=response;
        console.log("response received");
      },
      error=>{
        console.log("exception occured")
      }
      

    )
  }

  public searchEmployees(key: any):void{
    const results:OrderResponse[]=[];
    for(const customer of this.customerinfo){
      if(customer.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 
      || customer.date.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || customer.address.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || customer.region.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || customer.ville.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || customer.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || customer.productName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || customer.productPrice==key
      || customer.productQte==key
      || customer.id==key
      ){
        results.push(customer);

      }
    }
    this.customerinfo=results;
    if(results.length==0 || !key){
      this.getInfo();
    }
  }
  public commandsPdf(){
    this.service.commandsPdf().subscribe(
      (data:Blob)=>{
        var file = new Blob([data], { type: 'application/pdf' })
        var fileURL = URL.createObjectURL(file);
        //window.open(fileURL); 
          var a         = document.createElement('a');
          a.href        = fileURL; 
          a.target      = '_blank';
          a.download    = 'List-of-commands.pdf';
          document.body.appendChild(a);
          a.click();
        console.log("pdf generated successfully")
      },
      erro=>{
        console.log("pdf failed to generate")
      }
    )
  }

}
