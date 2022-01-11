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
  public stock2:Stock=new Stock();
  public products:Stock[];
  public deletePro:Stock;
  public msg='';

  constructor(private service:ProductManagerService) { }

  ngOnInit(): void {
    this.getStock()
  }
  public addStock(name:NgModel){
    this.service.postToStock(this.stock).subscribe(
      data =>{
        console.log("response received");
        this.getStock();
        name.reset();
      },
      error =>{
        console.log("exception occured")
        
      }
    )
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

  public updateProduct(form:NgForm){
    this.service.updateProduct(this.stock2).subscribe(
      data =>{
        console.log("response received")
        this.getStock();
        form.reset();
      },
      error =>{
        console.log("exception occured")
        this.msg="error occured";
      }
    )

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
    )
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
      erro=>{
        console.log("pdf failed to generate")
      }
    )
  }


}
