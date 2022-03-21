import { Component, OnInit } from '@angular/core';
import { ProductManagerService } from '../productManager.service';
import { Reservation } from '../reservation';

@Component({
  selector: 'app-admin-platform',
  templateUrl: './admin-platform.component.html',
  styleUrls: ['./admin-platform.component.css']
})
export class AdminPlatformComponent implements OnInit {
  public customerinfo:Reservation[];
  userName='';

  constructor(private service:ProductManagerService) { }

  ngOnInit(): void {
    this.getInfo();
    this.userName=sessionStorage.getItem('loggedUser');
  }

  public getInfo(){
    this.service.getInfo().subscribe(
      (response:Reservation[])=>{
        this.customerinfo=response;
        console.log(this.customerinfo);
      },
      error=>{
        console.log("exception occured")
      }
      

    )
  }

  public searchEmployees(key: any):void{
    const results:Reservation[]=[];
    for(const customer of this.customerinfo){
      if(customer.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 
      || customer.date==key
      || customer.address.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || customer.region.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || customer.ville.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || customer.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
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
