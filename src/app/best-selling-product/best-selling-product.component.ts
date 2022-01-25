import { Component, OnInit } from '@angular/core';
import { PopularProductComponent } from '../popular-product/popular-product.component';
import { ProductManagerService } from '../productManager.service';
import { Stock } from '../stock';

@Component({
  selector: 'app-best-selling-product',
  templateUrl: './best-selling-product.component.html',
  styleUrls: ['./best-selling-product.component.css']
})
export class BestSellingProductComponent implements OnInit {
  public products:Stock[];
  public bestselling:Stock[]=[];

  constructor(private service:ProductManagerService) { }

  ngOnInit(): void {
    this.getStock();
  }
  public getStock(){
    this.service.getStock().subscribe(
      (response:Stock[]) =>{
        this.products=response;
        this.products.sort(function(a:Stock, b:Stock){return (a.productQuantity*100/a.productQuantityI)-(b.productQuantity*100/b.productQuantityI)});  
        for (let i = 0; i < 4; i++) {
          this.bestselling.push(this.products[i])
          
        }
        console.log(this.bestselling)
      },
      error =>{
        console.log("exception occured")
      }
    )
  }

}
