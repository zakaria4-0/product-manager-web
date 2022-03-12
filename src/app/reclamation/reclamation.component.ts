import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


import { ProductManagerService } from '../productManager.service';
import { Reclamation } from '../reclamation';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  public reclamation:Reclamation=new Reclamation();
  msg='';
  msg1='';

  constructor(private service:ProductManagerService) { }

  ngOnInit(): void {
    
  }
  public addReclamation(forme:NgForm){
    this.service.addReclamation(this.reclamation).subscribe(
      (response:Reclamation)=>{
        console.log(response);
        this.msg="";
        this.msg1="Reclamation sent successfully "
        forme.reset();
      },
      (error:HttpErrorResponse) =>{
        console.log(error);
        this.msg1="";
        this.msg=error.error.message;
      }
    )
  }
 

}
