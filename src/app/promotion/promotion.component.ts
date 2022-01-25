import { Component, OnInit } from '@angular/core';
import { ProductManagerService } from '../productManager.service';
import { Stock } from '../stock';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {
  public promotion:Stock[];
  
  constructor(private service:ProductManagerService) { }

  ngOnInit(): void {
    this.getStockByState();
  }
  public getStockByState(){
    this.service.getStockByState("promotion").subscribe(
      (response:Stock[])  =>{
            this.promotion=response;
            for (let i = 0; i < this.promotion.length; i++) {
              this.promotion[i].x=Math.trunc(100-this.promotion[i].promotionPrice*100/this.promotion[i].productPrice)
              
            }
      },
      error =>{
        console.log("can't get stock by state")
      }
    )
  }
}
