import { Component, OnInit } from '@angular/core';
import { Indicator } from '../indicator';
import { ProductManagerService } from '../productManager.service';
import { Reservation } from '../reservation';
import { Time } from "@angular/common";
import { BarController, BarElement, CategoryScale, Chart, LinearScale, LineController, LineElement, PointElement, Title } from 'chart.js';
import { OrderResponse } from '../orderResponse';
import { map, share, Subscription, timer } from 'rxjs';
import { Reclamation } from '../reclamation';
Chart.register(LineController ,BarController,BarElement ,CategoryScale, LineElement, PointElement, LinearScale, Title);
@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.css']
})
export class KPIComponent implements OnInit {
  public indicator:Indicator=new Indicator;
  public res:Reservation=new Reservation();
  userName='';
  public reservations:OrderResponse[];
  public efficiency:number[]=[];
  public ppm:number[]=[];
  public time:Time[]=[];
  public time1:Time[]=[];
  public chart1:Chart;
  public chart2:Chart;
  rxTime = new Date();
  subscription: Subscription;
  constructor(private service:ProductManagerService) { }

  ngOnInit(): void {
    var today=new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    this.res.date=yyyy+"-"+mm+"-"+dd;
    this.userName=sessionStorage.getItem("loggedUser")
    this.kpis();
    this.chart();
    this.chartR();
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
  public chart(){
    this.service.chart(this.res.date).subscribe(
      (response:Reservation[])=>{
        this.efficiency=[];
        this.time=[];
        for (let i = 0; i < response.length; i++) {
          this.efficiency.push(response[i].id-response[0].id+1);
          this.time.push(response[i].time);
        }
        if (this.chart1!=null) {
          this.chart1.destroy();
        }
        this.chart1=new Chart("myAreaChart", {
          type: 'line',
          data: {
              datasets: [{
                  label: 'Current Vallue',
                  data: this.efficiency,
                  backgroundColor: "rgb(115 185 243 / 65%)",
                  borderColor: "#00e741",
                  fill: true,
              },
             ],
              labels: this.time
          },
          options:{
            scales: {
              x: {
                  display: true
              },
              y: {
                  display: true
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
  public chartR(){
    this.service.chart2(this.res.date).subscribe(
      (response:Reclamation[])=>{
        this.ppm=[];
        this.time1=[];
        for (let i = 0; i < response.length; i++) {
          this.ppm.push(response[i].id-response[0].id+1);
          this.time1.push(response[i].time);
        }
        if (this.chart2!=null) {
          this.chart2.destroy();
        }
        this.chart2=new Chart("myAreaChart2", {
          type: 'bar',
          data: {
              datasets: [{
                  label: 'Current Vallue',
                  data: this.ppm,
                  backgroundColor: "rgb(115 185 243 / 65%)",
                  borderColor: "#00e741",
                  
              },
             ],
              labels: this.time1
          },
          options:{
            scales: {
              x: {
                  display: true
              },
              y: {
                  display: true
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
      (response:OrderResponse[])=>{
        this.reservations=response;
      },
      error =>{
        console.log("getInfo failed")
      }
      
    )
  }

}
