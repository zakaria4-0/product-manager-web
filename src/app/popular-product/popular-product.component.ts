import { Component, OnInit } from '@angular/core';
import { ProductManagerService } from '../productManager.service';
import { Stock } from '../stock';

@Component({
  selector: 'app-popular-product',
  templateUrl: './popular-product.component.html',
  styleUrls: ['./popular-product.component.css']
})
export class PopularProductComponent implements OnInit {
  public products:Stock[];
  public popular:Stock[]=[];

  constructor(private service:ProductManagerService) { }

  ngOnInit(): void {
    this.getStock();
  }
  public getStock(){
    this.service.getStock().subscribe(
      (response:Stock[]) =>{
        this.products=response;
        this.products.sort(function(a:Stock, b:Stock){return (b.productQuantityI-b.productQuantity)-(a.productQuantityI-a.productQuantity)});
        for (let i = 0; i < 4; i++) {
          this.popular.push(this.products[i])
          
        }
        console.log(this.popular)
      },
      error =>{
        console.log("exception occured")
      }
    )
  }

}
