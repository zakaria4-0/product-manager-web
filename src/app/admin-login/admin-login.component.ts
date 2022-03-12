import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../admin';
import { ProductManagerService } from '../productManager.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  public adminLog:Admin=new Admin();
  public msg='';
  constructor(private servcie:ProductManagerService, private router:Router) { }

  ngOnInit(): void {
  }

  public loginAdmin(){
    this.servcie.loginAdmin(this.adminLog).subscribe(
      (response:Admin)=>{
        console.log("response received");
        sessionStorage.setItem('loggedUser',this.adminLog.name);
        this.router.navigate(['/admincontrolpage'])
      },
      (error:HttpErrorResponse)=>{
        console.log("exception occured");
        this.msg=error.error.message;
      }
    )
  }

}
