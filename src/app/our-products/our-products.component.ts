import { Component, OnInit } from '@angular/core';
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
