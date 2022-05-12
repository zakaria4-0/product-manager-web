import { Component, OnInit } from '@angular/core';
import { Indicator } from '../indicator';
import { ProductManagerService } from '../productManager.service';
import { Reservation } from '../reservation';
import * as ch from 'chart.js';
import { map, share, Subscription, timer } from 'rxjs';
import { Reclamation } from '../reclamation';
import 'chartjs-adapter-moment';
import { Stock } from '../stock';
import { HttpErrorResponse } from '@angular/common/http';





ch.Chart.register(ch.TimeSeriesScale,ch.ArcElement,ch.TimeScale,ch.Legend,ch.Tooltip,ch.LineController ,ch.BarController,ch.BarElement ,ch.CategoryScale, ch.LineElement, ch.PointElement, ch.LinearScale,ch.DoughnutController ,ch.Title);
@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.css']
})
export class KPIComponent implements OnInit {
  public indicator:Indicator=new Indicator;
  public res:Reservation=new Reservation();
  userName='';
  public productsQte:number;
  public efficiency:number[]=[];
  public ppm:number[]=[];
  public time:Date[]=[];
  public time1:Date[]=[];
  public chart1:ch.Chart;
  public chart2:ch.Chart;
  public chart3:ch.Chart;
  public chart4:ch.Chart;
  public chart5: ch.Chart;
  rxTime = new Date();
  subscription: Subscription;
  public total:number;
  public tauxCloture:number;
  public reclamEncour:number;
  public tauxGrossiste:number=0; public tauxPharmacie:number; public tauxClinique:number;public tauxParaDroguiste:number; public tauxParticulierAutres:number; public tauxInstitutions:number;
  chart6: any;
  chart7: any;
  chart8: any;
  public chart9:ch.Chart;
  public commands:number[]
  
  constructor(private service:ProductManagerService) { }

  ngOnInit(): void {
    var today=new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    this.res.date=yyyy+"-"+mm+"-"+dd;
    this.userName=sessionStorage.getItem("loggedUser");

    this.getStock();
    this.chart();
    this.chartGrossiste();
    this.chartPharmacie();
    this.chartClinique();
    this.chartParaDroguiste();
    this.chartParticulierAutre();
    this.chartInstitution();
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe(time => {
        this.rxTime = time;
      });

    this.service.reclamations().subscribe(
      (response:Reclamation[])=>{
        var i=0
        this.reclamEncour=0
        for (let reclam of response) {
          if (reclam.etat!=null) {
            i+=1
          }
          if (reclam.etat==null) {
            this.reclamEncour+=1
          }
        }
        this.tauxCloture=100*i/response.length
      }
    );
  }

  public kpis(){
    var qte;
    this.commands=[]
    this.service.kpis(this.res.date).subscribe(
      (response:Indicator) =>{
        this.indicator=response;
        console.log(this.indicator);
      },
      error =>{
        console.log("exception occured");
      }
    )
    this.service.commandeByCategory(this.res.date,"grossiste").subscribe(
      (response:Reservation[])=>{
        qte=0
        if(this.productsQte!=null && this.productsQte!=0){
        for (let res of response) {
          for (let pro of res.products) {
            qte += pro.qte
          }
        }
        this.tauxGrossiste=100*qte/this.productsQte
        
      }else{
        this.tauxGrossiste=0
      }
      this.commands.push(this.tauxGrossiste)
      },
      error =>{
        console.log("exception occured");
      }
    )
    this.service.commandeByCategory(this.res.date,"pharmacie").subscribe(
      (response:Reservation[])=>{
        qte=0
        if(this.productsQte!=null && this.productsQte!=0){
        for (let res of response) {
          for (let pro of res.products) {
            qte += pro.qte
          }
        }
        this.tauxPharmacie=100*qte/this.productsQte
        
      }else{
        this.tauxPharmacie=0
      }
      this.commands.push(this.tauxPharmacie)
      
      },
      error =>{
        console.log("exception occured");
      }
    )
    this.service.commandeByCategory(this.res.date,"clinique").subscribe(
      (response:Reservation[])=>{
        qte=0
        if(this.productsQte!=null && this.productsQte!=0){
        for (let res of response) {
          for (let pro of res.products) {
            qte += pro.qte
          }
        }
        this.tauxClinique=100*qte/this.productsQte
        
      }else{
        this.tauxClinique=0
      }
      this.commands.push(this.tauxClinique)
      },
      error =>{
        console.log("exception occured");
      }
    )
    this.service.commandeByCategory(this.res.date,"para-droguiste").subscribe(
      (response:Reservation[])=>{
        qte=0
        if(this.productsQte!=null && this.productsQte!=0){
        for (let res of response) {
          for (let pro of res.products) {
            qte += pro.qte
          }
        }
        this.tauxParaDroguiste=100*qte/this.productsQte
        
      }else{
        this.tauxParaDroguiste=0
      }
      this.commands.push(this.tauxParaDroguiste)
      },
      error =>{
        console.log("exception occured");
      }
    )
    this.service.commandeByCategory(this.res.date,"particulier + autre").subscribe(
      (response:Reservation[])=>{
        qte=0
        if(this.productsQte!=null && this.productsQte!=0){
        for (let res of response) {
          for (let pro of res.products) {
            qte += pro.qte
          }
        }
        this.tauxParticulierAutres=100*qte/this.productsQte
        
      }else{
        this.tauxParticulierAutres=0
      }
      this.commands.push(this.tauxParticulierAutres)
      },
      error =>{
        console.log("exception occured");
      }
    )
    this.service.commandeByCategory(this.res.date,"institution").subscribe(
      (response:Reservation[])=>{
        qte=0
        if(this.productsQte!=null && this.productsQte!=0){
        for (let res of response) {
          for (let pro of res.products) {
            qte += pro.qte
          }
        }
        this.tauxInstitutions=100*qte/this.productsQte
        
      }else{
        this.tauxInstitutions=0
      }
      this.commands.push(this.tauxInstitutions)
      },
      error =>{
        console.log("exception occured");
      }
    )
    console.log(this.commands)
    
    this.chartRepartitionCommande();
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
      
      },
      error =>{
        console.log("failed to load the chart");
      }
    )
    this.kpis();
    this.chartR()
  }
  public chartGrossiste(){
    var grossiste: number[]=[]
    var houres: Date[]=[]
    var tauxCommande;
    var qte;
    this.service.commandeByCategory(this.res.date,"grossiste").subscribe(
      (response:Reservation[])=>{
        qte=0
        for (let res of response) {
          for (let pro of res.products) {
            qte += pro.qte
          }
          tauxCommande=100*qte/this.productsQte;
          grossiste.push(tauxCommande);
          houres.push(res.time);
        }
        if (this.chart3!=null) {
          this.chart3.destroy();
        }
        this.chart3=new ch.Chart("myAreaChart3",{
          type: 'line',
          data: {
              datasets: [{
                  label: 'taux de commande grossiste',
                  data: grossiste,

                  backgroundColor: "rgb(115 185 243 / 65%)",
                  borderColor: "#0431B4",
                  fill: true,
              },
             ],
              labels: houres
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
                text: 'taux de commande grossiste'
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
        })
      
      },
      (error:HttpErrorResponse) =>{
        console.log(error.error.message);
      }
    )
  }
  public chartPharmacie(){
    var pharmacie: number[]=[]
    var houres: Date[]=[]
    var tauxCommande;
    var qte;
    this.service.commandeByCategory(this.res.date,"pharmacie").subscribe(
      (response:Reservation[])=>{
        qte=0
        for (let res of response) {
          for (let pro of res.products) {
            qte += pro.qte
          }
          tauxCommande=100*qte/this.productsQte;
          pharmacie.push(tauxCommande);
          houres.push(res.time);
        }
        if (this.chart4!=null) {
          this.chart4.destroy();
        }
        this.chart4=new ch.Chart("myAreaChart4",{
          type: 'line',
          data: {
              datasets: [{
                  label: 'taux de commande pharmacie',
                  data: pharmacie,

                  backgroundColor: "rgb(115 185 243 / 65%)",
                  borderColor: "#FFFF00",
                  fill: true,
              },
             ],
              labels: houres
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
                text: 'taux de commande pharmacie'
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
        })
      
      },
      (error:HttpErrorResponse) =>{
        console.log(error.error.message);
      }
    )
  }
  public chartClinique(){
    var clinique: number[]=[]
    var houres: Date[]=[]
    var tauxCommande;
    var qte;
    this.service.commandeByCategory(this.res.date,"clinique").subscribe(
      (response:Reservation[])=>{
        qte=0
        for (let res of response) {
          for (let pro of res.products) {
            qte += pro.qte
          }
          tauxCommande=100*qte/this.productsQte;
          clinique.push(tauxCommande);
          houres.push(res.time);
        }
        if (this.chart5!=null) {
          this.chart5.destroy();
        }
        this.chart5=new ch.Chart("myAreaChart5",{
          type: 'line',
          data: {
              datasets: [{
                  label: 'taux de commande pharmacie',
                  data: clinique,

                  backgroundColor: "rgb(115 185 243 / 65%)",
                  borderColor: "#FE2E64",
                  fill: true,
              },
             ],
              labels: houres
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
                text: 'taux de commande clinique'
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
        })
      
      },
      (error:HttpErrorResponse) =>{
        console.log(error.error.message);
      }
    )
    
  }
  public chartParaDroguiste(){
    var paraDroguiste: number[]=[]
    var houres: Date[]=[]
    var tauxCommande;
    var qte;
    this.service.commandeByCategory(this.res.date,"para-droguiste").subscribe(
      (response:Reservation[])=>{
        qte=0
        for (let res of response) {
          for (let pro of res.products) {
            qte += pro.qte
          }
          tauxCommande=100*qte/this.productsQte;
          paraDroguiste.push(tauxCommande);
          houres.push(res.time);
        }
        if (this.chart6!=null) {
          this.chart6.destroy();
        }
        this.chart6=new ch.Chart("myAreaChart6",{
          type: 'line',
          data: {
              datasets: [{
                  label: 'taux de commande pharmacie',
                  data: paraDroguiste,

                  backgroundColor: "rgb(115 185 243 / 65%)",
                  borderColor: "#04B4AE",
                  fill: true,
              },
             ],
              labels: houres
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
                text: 'taux de commande paraDroguiste'
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
        })
      
      },
      (error:HttpErrorResponse) =>{
        console.log(error.error.message);
      }
    )
  }
  public chartParticulierAutre(){
    var institution: number[]=[]
    var houres: Date[]=[]
    var tauxCommande;
    var qte;
    this.service.commandeByCategory(this.res.date,"institution").subscribe(
      (response:Reservation[])=>{
        qte=0
        for (let res of response) {
          for (let pro of res.products) {
            qte += pro.qte
          }
          tauxCommande=100*qte/this.productsQte;
          institution.push(tauxCommande);
          houres.push(res.time);
        }
        if (this.chart8!=null) {
          this.chart8.destroy();
        }
        this.chart8=new ch.Chart("myAreaChart8",{
          type: 'line',
          data: {
              datasets: [{
                  label: 'taux de commande institution',
                  data: institution,

                  backgroundColor: "rgb(115 185 243 / 65%)",
                  borderColor: "#04B4AE",
                  fill: true,
              },
             ],
              labels: houres
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
                text: 'taux de commande institution'
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
        })
      
      },
      (error:HttpErrorResponse) =>{
        console.log(error.error.message);
      }
    )
  }
  public chartInstitution(){
    var particulierAutre: number[]=[]
    var houres: Date[]=[]
    var tauxCommande;
    var qte;
    this.service.commandeByCategory(this.res.date,"particulier + autre").subscribe(
      (response:Reservation[])=>{
        qte=0
        for (let res of response) {
          for (let pro of res.products) {
            qte += pro.qte
          }
          tauxCommande=100*qte/this.productsQte;
          particulierAutre.push(tauxCommande);
          houres.push(res.time);
        }
        if (this.chart7!=null) {
          this.chart7.destroy();
        }
        this.chart7=new ch.Chart("myAreaChart7",{
          type: 'line',
          data: {
              datasets: [{
                  label: 'taux de commande particulier+autre',
                  data: particulierAutre,

                  backgroundColor: "rgb(115 185 243 / 65%)",
                  borderColor: "#DF3A01",
                  fill: true,
              },
             ],
              labels: houres
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
                text: 'taux de commande particulier+Autre'
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
        })
      
      },
      (error:HttpErrorResponse) =>{
        console.log(error.error.message);
      }
    )
  }
  public chartRepartitionCommande(){
    
    console.log(this.commands)
    if(this.chart9!=null){
      this.chart9.destroy();
    }
    this.chart9=new ch.Chart("myAreaChart9",{
      type:"doughnut",
      data:{
        labels:[
          'grossiste', 'pharmacie','clinique','para/droguiste','particulier+autres','institutions'
        ],
        datasets:[{
          data:this.commands,
          backgroundColor:[
           'blue','red',"pink","yellow","green","grey"
          ]
        }]
      }
    })
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

}
