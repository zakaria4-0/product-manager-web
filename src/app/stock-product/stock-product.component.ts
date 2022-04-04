import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ProductManagerService } from '../productManager.service';
import { Stock } from '../stock';

@Component({
  selector: 'app-stock-product',
  templateUrl: './stock-product.component.html',
  styleUrls: ['./stock-product.component.css']
})
export class StockProductComponent implements OnInit {
  public stock:Stock=new Stock();
  public stock2:Stock;
  public products:Stock[];
  public deletePro:Stock;
  public updatePro:Stock=new Stock();
  public stock3:Stock=new Stock();
  public msg='';
  public msg2='';
  userName='';
  public total1:number;
  public total2: number;

  constructor(private service:ProductManagerService) { }

  ngOnInit(): void {
    this.getStock();
    this.userName=sessionStorage.getItem('loggedUser');
  }
  public addStock(form:NgForm){
    this.service.postToStock(this.stock).subscribe(
      data =>{
        console.log("response received");
        this.getStock();
        form.reset();
      },
      (error:HttpErrorResponse) =>{
        console.log("exception occured")
        this.msg2=error.error.message;
      }
    )
  }

  public getStock(){
    this.service.getStock().subscribe(
      (response:Stock[]) =>{
        this.products=response;
        this.total1=0;
        this.total2=0
        for(let pro of this.products){
          this.total1 +=pro.productQuantityI;
          this.total2 +=pro.productQuantity;
        }
        console.log(this.products)
      },
      error =>{
        console.log("exception occured");
      }
    )
  }
  public onSelectProduct(product:Stock):void{
    this.updatePro=product;
  }

  public updateProduct(product:Stock):void{
    this.service.updateProduct(product).subscribe(
      (Response:Stock) =>{
        console.log(Response);
        this.getStock();
      },
      error =>{
        console.log("exception occured");
        this.msg="error occured";
      }
    );

  }

  public deleteProduct(id:number){
    this.service.deleteProduct(id).subscribe(
      data=>{
        console.log("product deleted successfuly")
        this.getStock();
      },
      error=>{
        console.log("failed to delete product")
      }
    );
  }

  public onOpenModal(product:Stock): void {
    const container = document.getElementById('con');
    
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
   
    this.deletePro=product;
    button.setAttribute('data-target', '#deleteEmployeeModal');
    
    container?.appendChild(button);
    
    button.click();
  }
  public stockPdf(){
    this.service.stockPdf().subscribe(
      (data:Blob)=>{
        var file = new Blob([data], { type: 'application/pdf' })
        var fileURL = URL.createObjectURL(file);
        //window.open(fileURL); 
          var a         = document.createElement('a');
          a.href        = fileURL; 
          a.target      = '_blank';
          a.download    = 'List-of-products.pdf';
          document.body.appendChild(a);
          a.click();
        console.log("pdf generated successfully")
      },
      error=>{
        console.log("pdf failed to generate")
      }
    )
  }
  public searchProduct(key: any):void{
    const results:Stock[]=[];
    for(const prod of this.products){
      if(prod.productName.toLowerCase().indexOf(key.toLowerCase()) !== -1 
      || prod.productPrice==key
      || prod.id==key
      || prod.category.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || prod.state.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || prod.productQuantityI==key
      
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
