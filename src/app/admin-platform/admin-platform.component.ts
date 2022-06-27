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
  totalPrice:number;
  totalQte:number;

  constructor(private service:ProductManagerService) { }

  ngOnInit(): void {
    this.getInfo();
    this.userName=sessionStorage.getItem('loggedUser');
  }

  public getInfo(){
    this.service.getInfo().subscribe(
      (response:Reservation[])=>{
        this.customerinfo=response;
        this.totalPrice=0;
        this.totalQte=0;
        for (let reserv of response) {
          this.totalPrice +=reserv.total;
          for (let product of reserv.products) {
            this.totalQte += product.qte
          }
        }
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
  public commandsExcel(){
    this.service.commandesExcelExporter().subscribe(
      (data:Blob)=>{
        var today:Date=new Date();
        var file = new Blob([data], { type: 'application/octet-stream' })
        var fileURL = URL.createObjectURL(file);
        //window.open(fileURL); 
          var a         = document.createElement('a');
          a.href        = fileURL; 
          a.target      = '_blank';
          a.download    = 'commandes'+"_"+today+'.xlsx';
          document.body.appendChild(a);
          a.click();
        console.log("Excel generated successfully")
      }
    )
  }

}
