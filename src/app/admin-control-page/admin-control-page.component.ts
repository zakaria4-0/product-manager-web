import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductManagerService } from '../productManager.service';
import { Stock } from '../stock';

@Component({
  selector: 'app-admin-control-page',
  templateUrl: './admin-control-page.component.html',
  styleUrls: ['./admin-control-page.component.css']
})
export class AdminControlPageComponent implements OnInit {
  public products:Stock[];
  userName='';
  constructor(private router:Router, private service:ProductManagerService) { }

  ngOnInit(): void {
    this.getStock();
    this.userName=sessionStorage.getItem('loggedUser');
    
  }
  

  public getStock(){
    this.service.getStock().subscribe(
      (response:Stock[]) =>{
        this.products=response;
        this.css(this.products);
        console.log(this.products)
      },
      error =>{
        console.log("exception occured")
      }
    )
  }
  public css(products:Stock[]){
    const container=document.getElementById("progress")
    for (let index = 0; index < products.length; index++) {
      var a=products[index].productQuantity*100/products[index].productQuantityI;
      const div = document.createElement('div');
      div.id="main";
      const small=document.createElement('small');
      small.innerHTML=this.products[index].productName;
      div.append(small);
      const progress=document.createElement('div');
      progress.className="progress";
      div.append(progress);
      const prog_bar=document.createElement('div');
      if(a>=67){
      prog_bar.className="progress-bar bg-success progress-bar-striped progress-bar-animated";}
      if(a<67 && a>=33){
        prog_bar.className="progress-bar bg-warning progress-bar-striped progress-bar-animated";}
      if(a<33){
        prog_bar.className="progress-bar bg-danger progress-bar-striped progress-bar-animated";
      }
      prog_bar.setAttribute('role','progressbar');
      prog_bar.setAttribute('aria-valuenow','100');
      prog_bar.setAttribute('aria-valuemin','0');
      prog_bar.setAttribute('aria-valuemax','100');
      prog_bar.style.width=a +"%";
      progress.append(prog_bar);
      const span=document.createElement('span')
      span.innerHTML= a.toFixed(2) +"%";
      prog_bar.append(span);
      container.append(div)

      
      
      
    
  }
  }
}

  
  
  
