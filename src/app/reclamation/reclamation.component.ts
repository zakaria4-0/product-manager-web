import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


import { ProductManagerService } from '../productManager.service';
import { Reclamation } from '../reclamation';
import { ReclamSupport } from '../reclamSupport';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  public reclamSupport:ReclamSupport=new ReclamSupport();
  public reclamation:Reclamation=new Reclamation();
  public reclamSupportList:ReclamSupport[];
  msg='';
  msg1='';
  msg2='';

  constructor(private service:ProductManagerService) { }

  ngOnInit(): void {
    
  }
  public addReclamation(forme:NgForm){
    this.service.addReclamation(this.reclamation).subscribe(
      (response:Reclamation)=>{
        console.log(response);
        this.msg="";
        this.msg1="Reclamation sent successfully "
        this.deleteAllReclams();
        forme.reset();
      },
      (error:HttpErrorResponse) =>{
        console.log(error);
        this.msg1="";
        this.msg=error.error.message;
      }
    )
  }
  public addReclamSupport(forme:NgForm){
    this.service.addReclamSupport(this.reclamSupport).subscribe(
      (response:ReclamSupport)=>{
        console.log(response)
        this.msg2='';
        this.getReclamSupport(response.cName);
        forme.reset();
      },
      (error:HttpErrorResponse)=>{
        this.msg2=error.error.message;
        console.log(this.msg2);
      }
    )
  }
  public getReclamSupport(cname:string){
    this.service.getReclamSupport(cname).subscribe(
      (response:ReclamSupport[])=>{
        this.reclamation.productClaimeds=response;
        this.reclamSupportList=response;
        
      },
      (error:HttpErrorResponse)=>{
        console.log(error.error.message);
      }
    )
  }
 
  public deleteReclamation(id:number){
    this.service.deleteReclamation(id).subscribe(
      data=>{
        console.log("deleted successfuly")
        this.getReclamSupport(this.reclamSupport.cName);
      },
      error=>{
        console.log("delete failed")
      })
  }
  public deleteAllReclams(){
    this.service.deleteAllReclam().subscribe(
      data=>{
        console.log("deleted successfuly")
        this.getReclamSupport(this.reclamSupport.cName);
      },
      error=>{
        console.log("delete failed")
      }
    )
  }

}
