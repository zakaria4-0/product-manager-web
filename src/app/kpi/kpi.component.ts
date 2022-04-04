import { Component, OnInit } from '@angular/core';
import { Indicator } from '../indicator';
import { ProductManagerService } from '../productManager.service';
import { Reservation } from '../reservation';
import { Time } from "@angular/common";
import * as ch from 'chart.js';
import { map, share, Subscription, timer } from 'rxjs';
import { Reclamation } from '../reclamation';
import 'chartjs-adapter-moment';
import { Stock } from '../stock';





ch.Chart.register(ch.TimeSeriesScale,ch.TimeScale,ch.Legend,ch.Tooltip,ch.LineController ,ch.BarController,ch.BarElement ,ch.CategoryScale, ch.LineElement, ch.PointElement, ch.LinearScale, ch.Title);
@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.css']
})
export class KPIComponent implements OnInit {
  public indicator:Indicator=new Indicator;
  public res:Reservation=new Reservation();
  userName='';
  public reservations:Reservation[];
  public productsQte:number;
  public efficiency:number[]=[];
  public ppm:number[]=[];
  public time:Date[]=[];
  public time1:Date[]=[];
  public chart1:ch.Chart;
  public chart2:ch.Chart;
  rxTime = new Date();
  subscription: Subscription;
  public total:number;
  constructor(private service:ProductManagerService) { }

  ngOnInit(): void {
    this.getStock();
    var today=new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    this.res.date=yyyy+"-"+mm+"-"+dd;
    this.userName=sessionStorage.getItem("loggedUser")
    this.kpis();
    this.chart();
    
    this.getDates();
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe(time => {
        this.rxTime = time;
      });
  }

  public kpis(){
    this.service.kpis(this.res.date).subscribe(
      (response:Indicator) =>{
        this.indicator=response;
        console.log(this.indicator);
      },
      error =>{
        console.log("exception occured");
      }
    )
    
  }
  public getStock(){
    this.service.getStock().subscribe(
      (response:Stock[]) =>{
        this.total=0;
        for(let pro of response){
          this.total +=pro.productQuantity;
        }
      },
      error =>{
        console.log("exception occured");
      }
    )
  }
  public chart(){
    this.service.chart(this.res.date).subscribe(
      (response:Reservation[])=>{
        this.efficiency=[];
        this.time=[];
        this.productsQte=0;
        for (let i = 0; i < response.length; i++) {
          for(let j=0;j<response[i].products.length;j++){
            this.productsQte += response[i].products[j].qte;
          }
          this.efficiency.push(100*this.productsQte/this.total);
          this.time.push((response[i].time));
        }
        if (this.chart1!=null) {
          this.chart1.destroy();
        }
        this.chart1=new ch.Chart("myAreaChart", {
          type: 'line',
          data: {
              datasets: [{
                  label: 'taux de commande',
                  data: this.efficiency,

                  backgroundColor: "rgb(115 185 243 / 65%)",
                  borderColor: "#00e741",
                  fill: true,
              },
             ],
              labels: this.time
          },
          options: {
            hover: {
              // Overrides the global setting
              mode: 'index'
          },
          scales:{
            ticks:{
              display:false             
            },
            
            y:{
              suggestedMin: 0,
              
              title: {
                color: 'red',
                display: true,
                text: 'taux de commande'
              },
              ticks:{               
                color: 'blue'
              }
            },
            x:{
              type:'time',
              time:{
                parser:"hh:mm:ss",
                displayFormats:{
                  hour:'hh:mm:ss'
                }
              },
              title: {
                color: 'red',
                display: true,
                text: 'Time'
              },
              grid: {
                tickColor: 'red'
              },
              ticks:{
                autoSkip:false,
                color: 'blue'
              }
            }
          }
        }
          
     
      });
      this.chartR();
      },
      error =>{
        console.log("failed to load the chart");
      }
    )
  }
  public chartR(){
    this.service.chart2(this.res.date).subscribe(
      (response:Reclamation[])=>{
        this.ppm=[];
        this.time1=[];
        var total=0;
        for (let reclam of response) {
          for (let product of reclam.productClaimeds) {
            total += product.qte;
          }
          if (this.productsQte!=0) {
            this.ppm.push(100*(total)/this.productsQte);
          }else{
            this.ppm.push(100*total);
          }
          this.time1.push(reclam.time);
        }
        if (this.chart2!=null) {
          this.chart2.destroy();
        }
        this.chart2=new ch.Chart("myAreaChart2", {
          type: 'bar',
          data: {
              datasets: [{
                  label: 'taux de reclamation',
                  data: this.ppm,
                  backgroundColor: "rgba(241, 100, 100, 0.842 )",
                  borderColor: "#00e741",
              },
             ],
              labels: this.time1
          },
          
          options: {
            hover: {
              // Overrides the global setting
              mode: 'index',
              
          },
          scales:{
            ticks:{
              display:false
              
            },
            
            y:{
              suggestedMin: 0,
              title: {
                color: 'red',
                display: true,
                text: 'taux de reclamation'
              },
              ticks:{               
                color: 'blue'
              }
            },
            x:{
              
              type:'time',
              time:{
                parser:"hh:mm:ss",
                displayFormats:{
                  hour:'hh:mm:ss'
                }
              },
              title: {
                color: 'red',
                display: true,
                text: 'Time'
              },
              grid: {
                tickColor: 'red'
              },
              ticks:{
                autoSkip:false,
                color: 'blue'
              }
            }
          }
        }
     
      });
      },
      error =>{
        console.log("failed to load the chart");
      }
    )
  }
  public getDates(){
    this.service.getInfo().subscribe(
      (response:Reservation[])=>{
        this.reservations=response;
      },
      error =>{
        console.log("getInfo failed")
      }
      
    )
  }

}
