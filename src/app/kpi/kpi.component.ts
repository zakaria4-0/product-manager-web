import { Component, OnInit } from '@angular/core';
import { Indicator } from '../indicator';
import { ProductManagerService } from '../productManager.service';
import { Reservation } from '../reservation';
import * as ch from 'chart.js';
import { map, share, Subscription, timer } from 'rxjs';
import { Reclamation } from '../reclamation';
import 'chartjs-adapter-moment';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductC } from '../productC';

ch.Chart.register(ch.TimeSeriesScale,ch.ArcElement,ch.TimeScale,ch.Legend,ch.Tooltip,ch.LineController ,ch.BarController,ch.BarElement ,ch.CategoryScale, ch.LineElement, ch.PointElement, ch.LinearScale,ch.DoughnutController ,ch.Title);
@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.css']
})
export class KPIComponent implements OnInit {
  public indicator:Indicator=new Indicator;
  public totalCommandes:number
  public totalReclamations:number
  userName='';
  public productsQte:number;
  public efficiency:number[]=[];
  public ppm:number[]=[];
  public chart1:ch.Chart;
  public chart2:ch.Chart;
  public chart3:ch.Chart;
  public chart4:ch.Chart;
  public chart5: ch.Chart;
  rxTime = new Date();
  subscription: Subscription;
  public total:number;
  public total2:number;
  public tauxCloture:number;
  public reclamEncour:number;
  chart6: any;
  chart7: any;
  chart8: any;
  public chart9:ch.Chart;
  public totalReclamation:number
  public chart10: ch.Chart;
  public tauxCategory:number[]
  public tauxCategoryByYear:number[]
  public today=new Date();
  public dd = String(this.today.getDate()).padStart(2, '0');
  public mm = String(this.today.getMonth() + 1).padStart(2, '0');
  public yyyy = this.today.getFullYear();
  year=this.yyyy.toString();
  month:string
  date:string
  tempsClotureMoyen:number
  constructor(private service:ProductManagerService) {
    
   }

  ngOnInit(): void {
    this.month=this.year+"-"+this.mm
    this.date=this.month+"-"+this.dd;
    this.userName=sessionStorage.getItem("loggedUser");

    this.total=0
    this.totalCommandes=0
    var clients=["grossiste","pharmacie","clinique","para-droguiste","particulier+autre","institution"]
    var totalCategoryYear
    var qte
    this.tauxCategoryByYear=[0,0,0,0,0,0]
    this.service.chart(this.year).subscribe(
      (response:Reservation[])=>{
        for(let res of response){
          for(let pro of res.products){
            this.totalCommandes+=pro.qte
          }
          if(res.month==this.month){
            for(let pro of res.products){
              this.total+=pro.qte
            }
          }
        }
        for(let client of clients){
          totalCategoryYear=0
          qte=0
        for(let res of response){
            if(res.category==client){
              for(let pro of res.products){
                qte+=pro.qte
              }
            }
          }
          if(this.totalCommandes!=0){
            totalCategoryYear=100*qte/this.totalCommandes
          }
          this.tauxCategoryByYear[clients.indexOf(client)]=totalCategoryYear
        }
        console.log(this.total);
        this.kpiByClient();
      }
    )

this.total2=0
this.totalReclamations=0
var somme=0
this.tempsClotureMoyen=0
var i=0
    this.service.chart2(this.year).subscribe(
      (response:Reclamation[])=>{
        for(let res of response){
          if(res.etat=="clôturé"){
            somme+=Date.parse(res.dateCloture)-Date.parse(res.date);
            i+=1 
          }
          this.tempsClotureMoyen=(somme/i)/(1000 * 60 * 60 * 24)
          for(let pro of res.productClaimeds){
            this.totalReclamations+=pro.qte
          }
          if(res.month==this.month){
            for(let pro of res.productClaimeds){
              this.total2+=pro.qte
            }
          }
        }
        console.log(this.total2)
        this.chartRepartitionReclamation();
      }
    )

    this.kpis();
    this.reclamationStat();
    this.chart();
    this.chartR()
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
  }
  public kpis(){
    this.service.kpis(this.month).subscribe(
      (response:Indicator) =>{
        this.indicator=response;
        console.log(this.indicator);
      },
      error =>{
        console.log("exception occured");
      }
    )
    
  }
  public kpiByClient(){
    const clients=["grossiste","pharmacie","clinique","para-droguiste","particulier+autre","institution"]
    var qte;
    var taux: number;
    this.tauxCategory=[0,0,0,0,0,0]
    
      
      this.service.commandeByCategory2(this.month).subscribe(
        (response:Reservation[])=>{
          for(let client of clients){
            taux=0
          qte=0
          for (let res of response) {
            if(res.category==client){
              for(let product of res.products){
              qte+=product.qte
            }
            }
            
          }
          if(this.total!=null && this.total!=0){
            taux=100*qte/this.total
          }
          this.tauxCategory[clients.indexOf(client)]=taux
          }
          
          console.log(this.tauxCategory)
          this.chartRepartitionCommande();    
        },
        error =>{
          console.log("exception occured");
        }
      )  
    }
  
  public chart(){
    var months=[this.year+"-01",this.year+"-02",this.year+"-03",this.year+"-04",this.year+"-05",this.year+"-06",this.year+"-07",this.year+"-08",this.year+"-09",this.year+"-10",this.year+"-11",this.year+"-12"]
    this.service.chart(this.year).subscribe(
      (response:Reservation[])=>{
        this.efficiency=[];
        for(let month of months){
          this.productsQte=0;
          for (let com of response) {
            if(com.month==month){
              for(let pro of com.products){
            this.productsQte += pro.qte;
          }
            }
        }
        this.efficiency.push(this.productsQte);
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
              labels: months
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
                parser:"yyyy-MM",
                displayFormats:{
                  hour:'yyyy-MM'
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
  public chartGrossiste(){
    var months=[this.year+"-01",this.year+"-02",this.year+"-03",this.year+"-04",this.year+"-05",this.year+"-06",this.year+"-07",this.year+"-08",this.year+"-09",this.year+"-10",this.year+"-11",this.year+"-12"]
    var grossiste: number[]=[]
    var qte;
    this.service.commandeByCategory(this.year,"grossiste").subscribe(
      (response:Reservation[])=>{
        for(let month of months){
          qte=0
        for (let res of response) {
          if(res.month==month){
            for (let pro of res.products) {
            qte += pro.qte
          }
          }
        }
          grossiste.push(qte);
        }
        
        if (this.chart3!=null) {
          this.chart3.destroy();
        }
        this.chart3=new ch.Chart("myAreaChart3",{
          type: 'bar',
          data: {
              datasets: [{
                  label: 'taux de commande grossiste',
                  data: grossiste,

                  backgroundColor: "rgb(115 185 243 / 65%)",
                  borderColor: "#0431B4",
              },
             ],
              labels: months
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
                parser:"yyyy-MM",
                displayFormats:{
                  hour:'yyyy-MM'
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
    var months=[this.year+"-01",this.year+"-02",this.year+"-03",this.year+"-04",this.year+"-05",this.year+"-06",this.year+"-07",this.year+"-08",this.year+"-09",this.year+"-10",this.year+"-11",this.year+"-12"]
    var pharmacie: number[]=[]
    var qte;
    this.service.commandeByCategory(this.year,"pharmacie").subscribe(
      (response:Reservation[])=>{
        for(let month of months){
          qte=0
        for (let res of response) {
          if(res.month==month){
          for (let pro of res.products) {
            qte += pro.qte
          }
        }
        }
        pharmacie.push(qte);
        }
        
        if (this.chart4!=null) {
          this.chart4.destroy();
        }
        this.chart4=new ch.Chart("myAreaChart4",{
          type: 'bar',
          data: {
              datasets: [{
                  label: 'taux de commande pharmacie',
                  data: pharmacie,

                  backgroundColor: "rgb(115 185 243 / 65%)",
                  borderColor: "#FFFF00",
                  
              },
             ],
              labels: months
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
                parser:"yyyy-MM",
                displayFormats:{
                  hour:'yyyy-MM'
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
    var months=[this.year+"-01",this.year+"-02",this.year+"-03",this.year+"-04",this.year+"-05",this.year+"-06",this.year+"-07",this.year+"-08",this.year+"-09",this.year+"-10",this.year+"-11",this.year+"-12"]
    var clinique: number[]=[]
    var qte;
    this.service.commandeByCategory(this.year,"clinique").subscribe(
      (response:Reservation[])=>{
        for(let month of months){
          qte=0
        for (let res of response) {
          if(res.month==month){
            for (let pro of res.products) {
            qte += pro.qte
          }
          } 
        }
        clinique.push(qte);
        }
        
        if (this.chart5!=null) {
          this.chart5.destroy();
        }
        this.chart5=new ch.Chart("myAreaChart5",{
          type: 'bar',
          data: {
              datasets: [{
                  label: 'taux de commande clinique',
                  data: clinique,

                  backgroundColor: "rgb(115 185 243 / 65%)",
                  borderColor: "#FE2E64",
                  
              },
             ],
              labels: months
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
                parser:"yyyy-MM",
                displayFormats:{
                  hour:'yyyy-MM'
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
    var months=[this.year+"-01",this.year+"-02",this.year+"-03",this.year+"-04",this.year+"-05",this.year+"-06",this.year+"-07",this.year+"-08",this.year+"-09",this.year+"-10",this.year+"-11",this.year+"-12"]
    var paraDroguiste: number[]=[]
    var qte;
    this.service.commandeByCategory(this.year,"para-droguiste").subscribe(
      (response:Reservation[])=>{
        for(let month of months){
          qte=0
        for (let res of response) {
          if(res.month==month){
            for (let pro of res.products) {
            qte += pro.qte
          }
          }
        }
        paraDroguiste.push(qte);
        }
        
        if (this.chart6!=null) {
          this.chart6.destroy();
        }
        this.chart6=new ch.Chart("myAreaChart6",{
          type: 'bar',
          data: {
              datasets: [{
                  label: 'taux de commande para-droguiste',
                  data: paraDroguiste,

                  backgroundColor: "rgb(115 185 243 / 65%)",
                  borderColor: "#04B4AE",
                  
              },
             ],
              labels: months
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
                parser:"yyyy-MM",
                displayFormats:{
                  hour:'yyyy-MM'
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
    var months=[this.year+"-01",this.year+"-02",this.year+"-03",this.year+"-04",this.year+"-05",this.year+"-06",this.year+"-07",this.year+"-08",this.year+"-09",this.year+"-10",this.year+"-11",this.year+"-12"]
    var PA: number[]=[]
    var qte;
    this.service.commandeByCategory(this.year,"particulier+autre").subscribe(
      (response:Reservation[])=>{
        for(let month of months){
          qte=0
        for (let res of response) {
          if(res.month==month){
            for (let pro of res.products) {
            qte += pro.qte
          }
          }
          
        }
        PA.push(qte);
        }
        
        if (this.chart7!=null) {
          this.chart7.destroy();
        }
        this.chart7=new ch.Chart("myAreaChart7",{
          type: 'bar',
          data: {
              datasets: [{
                  label: 'taux de commande particulier + autre',
                  data: PA,

                  backgroundColor: "rgb(115 185 243 / 65%)",
                  borderColor: "#04B4AE",
                  
              },
             ],
              labels: months
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
                text: 'taux de commande particulier + autre'
              },
              ticks:{               
                color: 'blue'
              }
            },
            x:{
              type:'time',
              time:{
                parser:"yyyy-MM",
                displayFormats:{
                  hour:'yyyy-MM'
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
    var months=[this.year+"-01",this.year+"-02",this.year+"-03",this.year+"-04",this.year+"-05",this.year+"-06",this.year+"-07",this.year+"-08",this.year+"-09",this.year+"-10",this.year+"-11",this.year+"-12"]
    var institution: number[]=[]
    var qte;
    this.service.commandeByCategory(this.year,"institution").subscribe(
      (response:Reservation[])=>{
        for(let month of months){
          qte=0
        for (let res of response) {
          if(res.month==month){
            for (let pro of res.products) {
            qte += pro.qte
          }
          }
        }
        institution.push(qte);
        }
        
        if (this.chart8!=null) {
          this.chart8.destroy();
        }
        this.chart8=new ch.Chart("myAreaChart8",{
          type: 'bar',
          data: {
              datasets: [{
                  label: 'taux de commande institutions',
                  data: institution,

                  backgroundColor: "rgb(115 185 243 / 65%)",
                  
                  
              },
             ],
              labels: months
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
                parser:"yyyy-MM",
                displayFormats:{
                  hour:'yyyy-MM'
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
    
    if(this.chart9!=null){
      this.chart9.destroy();
    }
    this.chart9=new ch.Chart("myAreaChart9",{
      type:"doughnut",
      data:{
        labels:[
          'grossiste', 'pharmacie','clinique','para/droguiste','particulier+autre','institutions'
        ],
        datasets:[{
          data:this.tauxCategory,
          backgroundColor:[
           'blue','#51D5C8',"pink","#690BBA","#30627A","grey"
          ],
          hoverOffset: 4,
          borderAlign: 'inner',
          borderJoinStyle:'round',
          
          
        }]
      },
      options:{
        radius:'80%'
      }
    })
  }
  public chartRepartitionReclamation(){
    var qte
    var pourcentageMotif
    var listPourcentage :number[]=[]
    const motifs=["livré non facturé","facturé non livré","erreur quantité","erreur de prix","erreur de préparation","erreur client","mode de paiment","défaut produit","défaut étiquette","baisse de prix","quantité endommagée","erreur de facture","erreur de livraison","retard livraison","proche périmé","non-fondées","autre"]
    
      this.service.productByDate(this.month).subscribe(
        (reponse:ProductC[])=>{
          for(let motif of motifs){
            pourcentageMotif=0
            qte=0
          for(let pro of reponse){
            if(pro.motif==motif){
            qte += pro.qte
            }
          }
          if(this.total2!=0){
            pourcentageMotif=100*qte/this.total2
          }
          listPourcentage.push(pourcentageMotif)
        }
        console.log(listPourcentage)
        if(this.chart10!=null){
          this.chart10.destroy();
        }
        this.chart10=new ch.Chart("myAreaChart10",{
          type:"doughnut",
          data:{
            labels:[
              "livré non facturé","facturé non livré","erreur quantité","erreur de prix","erreur de préparation","erreur client","mode de paiment","défaut produit","défaut étiquette","baisse de prix","quantité endommagée","erreur de facture","erreur de livraison","retard livraison","proche périmé","non-fondées","autre"
            ],
            datasets:[{
              data:listPourcentage,
              backgroundColor:[
               'blue','#51D5C8',"pink","#690BBA","#30627A","grey","rgb(219, 106, 0)","rgb(0, 172, 163)","rgb(179, 70, 252)","rgb(245, 102, 226)","rgba(110, 255, 171, 0.377)","rgba(0, 48, 153, 0.5)","rgba(88, 0, 0, 0.5)","rgba(146, 92, 92, 0.5)","rgba(158, 71, 0, 0.5)","rgba(152, 202, 151, 0.5)","rgb(189, 196, 94)"
              ],
              hoverOffset: 4,
              borderAlign: 'inner',
              borderJoinStyle:'round'
              
            }]
          },
          options:{
            radius:'85%'
          }
        })
        }
      )
  }
  public chartR(){
    this.ppm=[];
    var months=[this.year+"-01",this.year+"-02",this.year+"-03",this.year+"-04",this.year+"-05",this.year+"-06",this.year+"-07",this.year+"-08",this.year+"-09",this.year+"-10",this.year+"-11",this.year+"-12"]
    this.service.chart2(this.year).subscribe(
      (response:Reclamation[])=>{
        for(let month of months){
          this.totalReclamation=0;
        for (let reclam of response) {
          if(reclam.month==month){
            for (let product of reclam.productClaimeds) {
            this.totalReclamation += product.qte;
          }
          }
        }
        this.ppm.push(this.totalReclamation);
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
              labels: months
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
                parser:"yyyy-MM",
                displayFormats:{
                  hour:'yyyy-MM'
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
  public reclamationStat(){
    this.tauxCloture=0
      this.reclamEncour=0
    this.service.chart2(this.year).subscribe(
      (response:Reclamation[])=>{
        var i=0
        this.reclamEncour=0
        for (let reclam of response) {
          if (reclam.etat=="clôturé") {
            i+=1
          }
        }
        if(response.length!=0){
          this.tauxCloture=100*i/response.length
        this.reclamEncour=100-this.tauxCloture
        }
        
      }
    );
  }

}
