import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductManagerService } from '../productManager.service';
import { Stock } from '../stock';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public products:Stock[];
  public popular:Stock[]=[];
  public newest:Stock[];
  public bestselling:Stock[]=[];
 

  constructor(private service:ProductManagerService) { }

  ngOnInit(): void {
    this.getStock();
    this.getStockByState("new");
  }
  public getStock(){
    this.service.getStock().subscribe(
      (response:Stock[]) =>{
        this.products=response;
        this.products.sort(function(a:Stock, b:Stock){return (b.productQuantityI-b.productQuantity)-(a.productQuantityI-a.productQuantity)});
        for (let i = 0; i < 4; i++) {
          this.popular.push(this.products[i])
          
        }
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
  public openDiv(type:string){
    const container=document.getElementById("container");
    if(type=="popular"){
      container.innerHTML="";
      const h1=document.createElement('h1')
      h1.className="text-center text-muted";
      h1.innerHTML="Popular products";
      container.append(h1);
      const div1=document.createElement('div');
      div1.className="row flow-offset-1";
      container.append(div1);
      for (let i = 0; i < this.popular.length; i++) {
        const div2=document.createElement("div");
        div2.className="col-xs-6 col-md-4";
        div1.append(div2);
        const div3=document.createElement('div');
        div3.className="product tumbnail thumbnail-3";
        div2.append(div3);
        const a=document.createElement('a');
        a.href="/customerLogin";
        div3.append(a);
        const img=document.createElement('img');
        img.src=this.popular[i].productImage;
        img.style.width="350px";
        img.style.height="280px";
        a.append(img);
        const div4=document.createElement('div');
        div4.className="caption";
        div3.append(div4);
        const h6=document.createElement('h6');
        div4.append(h6);
        const a1=document.createElement('a');
        a1.className="productname";
        a1.href="/customerLogin";
        a1.innerHTML=this.popular[i].productName;
        a1.style.textDecoration="none";
        h6.append(a1);
        const span=document.createElement('span');
        span.className="price sale";
        span.innerHTML=this.popular[i].productPrice+"$";
        span.style.color="rgb(221, 101, 32)";
        div4.append(span);
        
      }
    }else{
    if(type=="newest"){
      container.innerHTML="";
      const h1=document.createElement('h1')
      h1.className="text-center text-muted";
      h1.innerHTML="Newest products";
      container.append(h1);
      const div1=document.createElement('div');
      div1.className="row flow-offset-1";
      container.append(div1);
      for (let i = 0; i < this.newest.length; i++) {
        const div2=document.createElement("div");
        div2.className="col-xs-6 col-md-4";
        div1.append(div2);
        const div3=document.createElement('div');
        div3.className="product tumbnail thumbnail-3";
        div2.append(div3);
        const a=document.createElement('a');
        a.href="/customerLogin";
        div3.append(a);
        const img=document.createElement('img');
        img.src=this.newest[i].productImage;
        img.style.width="350px";
        img.style.height="280px";
        a.append(img);
        const div4=document.createElement('div');
        div4.className="caption";
        div3.append(div4);
        const h6=document.createElement('h6');
        div4.append(h6);
        const a1=document.createElement('a');
        a1.className="productname";
        a1.href="/customerLogin";
        a1.innerHTML=this.newest[i].productName;
        a1.style.textDecoration="none";
        h6.append(a1);
        const span=document.createElement('span');
        span.className="price sale";
        span.innerHTML=this.newest[i].productPrice+"$";
        span.style.color="rgb(221, 101, 32)";
        div4.append(span);
        
        
      }
    }else{
      if(type=="bestselling"){
        container.innerHTML="";
        const h1=document.createElement('h1')
        h1.className="text-center text-muted";
        h1.innerHTML="Best products selling";
        container.append(h1);
        const div1=document.createElement('div');
        div1.className="row flow-offset-1";
        container.append(div1);
        for (let i = 0; i < this.bestselling.length; i++) {
          const div2=document.createElement("div");
          div2.className="col-xs-6 col-md-4";
          div1.append(div2);
          const div3=document.createElement('div');
          div3.className="product tumbnail thumbnail-3";
          div2.append(div3);
          const a=document.createElement('a');
          a.href="/customerLogin";
          div3.append(a);
          const img=document.createElement('img');
          img.src=this.bestselling[i].productImage;
          img.style.width="350px";
          img.style.height="280px";
          a.append(img);
          const div4=document.createElement('div');
          div4.className="caption";
          div3.append(div4);
          const h6=document.createElement('h6');
          div4.append(h6);
          const a1=document.createElement('a');
          a1.className="productname";
          a1.href="/customerLogin";
          a1.innerHTML=this.bestselling[i].productName;
          a1.style.textDecoration="none";
          h6.append(a1);
          const span=document.createElement('span');
          span.className="price sale";
          span.innerHTML=this.bestselling[i].productPrice+"$";
          span.style.color="rgb(221, 101, 32)";
          div4.append(span);
          
          
        }
      }
    }}
  }
  

}
