import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductManagerService } from '../productManager.service';
import { Stock } from '../stock';

@Component({
  selector: 'app-our-products',
  templateUrl: './our-products.component.html',
  styleUrls: ['./our-products.component.css']
})
export class OurProductsComponent implements OnInit {
  public products:Stock[];

  constructor(private service:ProductManagerService) { }

  ngOnInit(): void {
    this.getStock();
    
  }

  public getStock(){
    this.service.getStock().subscribe(
      (response:Stock[]) =>{
        this.products=response;
        console.log(this.products)
      },
      error =>{
        console.log("exception occured")
      }
    )
  }
  public getStockPopular(){
    var popular:Stock[]=[]
    this.service.getStock().subscribe(
      (response:Stock[]) =>{
        response.sort(function(a:Stock, b:Stock){return (b.productQuantityI-b.productQuantity)-(a.productQuantityI-a.productQuantity)});
        for (let i = 0; i < 4; i++) {
          popular.push(response[i])
        }
        this.products=popular
        console.log(popular)
      },
      error =>{
        console.log("exception occured")
      }
    )
  }
  public getStockByState(){
    var promotion:Stock[]=[]
    this.service.getStockByState("promotion").subscribe(
      (response:Stock[])  =>{
            promotion=response;
            for (let i = 0; i < promotion.length; i++) {
              promotion[i].x=Math.trunc(100-promotion[i].promotionPrice*100/promotion[i].productPrice)
            }
            this.products=promotion
      },
      error =>{
        console.log("can't get stock by state")
      }
    )
  }
  public getStockByState2(){
    
    this.service.getStockByState("nouveau").subscribe(
      (response:Stock[])  =>{
          this.products=response;
      },
      error =>{
        console.log("can't get stock by state")
      }
    )
  }
  public getStockBestSelling(){
    var bestselling:Stock[]=[]
    this.service.getStock().subscribe(
      (response:Stock[]) =>{
        this.products=response;
        this.products.sort(function(a:Stock, b:Stock){return (a.productQuantity*100/a.productQuantityI)-(b.productQuantity*100/b.productQuantityI)});  
        for (let i = 0; i < 4; i++) {
          bestselling.push(this.products[i])
        }
        this.products=bestselling
      },
      error =>{
        console.log("exception occured")
      }
    )
  }
  public getStockByCategory(category:string){
    this.service.getStockByCategory(category).subscribe(
      (response:Stock[])=>{
        this.products=response;
        console.log(this.products);
      }
    )
  }
  public searchProduct(key: any):void{
    const results:Stock[]=[];
    for(const prod of this.products){
      if(prod.productName.toLowerCase().indexOf(key.toLowerCase()) !== -1 
      || prod.productPrice==key
      
      ){
        results.push(prod);

      }
    }
    this.products=results;
    if(results.length==0 || !key){
      this.getStock();
    }
  }

}
