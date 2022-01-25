import { Component, OnInit } from '@angular/core';
import { ProductManagerService } from '../productManager.service';
import { Stock } from '../stock';

@Component({
  selector: 'app-newest-product',
  templateUrl: './newest-product.component.html',
  styleUrls: ['./newest-product.component.css']
})
export class NewestProductComponent implements OnInit {
  public newest:Stock[];

  constructor(private service:ProductManagerService) { }

  ngOnInit(): void {
    this.getStockByState("new");
  }
  public getStockByState(state:string){
    this.service.getStockByState(state).subscribe(
      (response:Stock[])  =>{
          this.newest=response;
      },
      error =>{
        console.log("can't get stock by state")
      }
    )
  }

}
