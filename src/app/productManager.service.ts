import { HttpBackend, HttpClient, HttpDownloadProgressEvent, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";


import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Admin } from "./admin";
import { Command } from "./command";

import { CustomerLogin } from "./customerLogin";
import { Indicator } from "./indicator";
import { Product } from "./product";
import { Reclamation } from "./reclamation";
import { ReclamSupport } from "./reclamSupport";
import { Reservation } from "./reservation";
import { Stock } from "./stock";

@Injectable({
    providedIn:'root'
})
export class ProductManagerService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http:HttpClient){}

    public loginAdmin(admin:Admin):Observable<Admin>{
        return this.http.post<Admin>(`${this.apiServerUrl}/productmanager/adminloging`,admin)

    }

    public loginCustomer(customerLogin:CustomerLogin):Observable<CustomerLogin>{
        return this.http.post<CustomerLogin>(`${this.apiServerUrl}/productmanager/customerlogin`,customerLogin)

    }

    public registrationCustomerLogin(customerLogin:CustomerLogin):Observable<CustomerLogin>{
        return this.http.post<CustomerLogin>(`${this.apiServerUrl}/productmanager/registercustomerlogin`,customerLogin)

    }


    public customerPlaceOrder(reservation:Reservation):Observable<Reservation>{
        return this.http.post<Reservation>(`${this.apiServerUrl}/productmanager/customerplaceorder`,reservation)

    }

    public customerLoginPlaceOrder(reservation:Reservation):Observable<Reservation>{
        return this.http.post<Reservation>(`${this.apiServerUrl}/productmanager/customerloginplaceorder`,reservation)

    }
    public getInfo():Observable<Reservation[]>{
        return this.http.get<Reservation[]>(`${this.apiServerUrl}/productmanager/getinfo`)
    }
    public postCommand(command:Command):Observable<Command[]>{
        return this.http.post<Command[]>(`${this.apiServerUrl}/productmanager/command`,command)

    }
    public postCommandLogin(command:Command):Observable<Command[]>{
        return this.http.post<Command[]>(`${this.apiServerUrl}/productmanager/commandLogin`,command)
    }
    public getCommand(cname:string):Observable<Command[]>{
        return this.http.get<Command[]>(`${this.apiServerUrl}/productmanager/getCommand/${cname}`)
    }

    public deleteCommand():Observable<void>{
       return this.http.delete<void>(`${this.apiServerUrl}/productmanager/deleteCommand`)
        
    }

    public getProduct(pid:number):Observable<Product[]>{
        return this.http.get<Product[]>(`${this.apiServerUrl}/productmanager/getCommand/${pid}`)

    }
    public postToStock(stock:Stock):Observable<Stock[]>{
        return this.http.post<Stock[]>(`${this.apiServerUrl}/productmanager/addToStock`,stock)

    }
    public getStock():Observable<Stock[]>{
        return this.http.get<Stock[]>(`${this.apiServerUrl}/productmanager/getStock`)

    }
    public updateProduct(stock:Stock):Observable<Stock>{
        return this.http.put<Stock>(`${this.apiServerUrl}/productmanager/updateProduct`,stock)
    }
    public deleteProduct(id:number):Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/productmanager/deleteProduct/${id}`)
    }
    public commandsPdf():Observable<Blob>{
        var authorization = 'Bearer '+sessionStorage.getItem("access_token");

         const headers = new HttpHeaders({ 'Content-Type': 'application/json',
         "Authorization": authorization, responseType : 'blob'});
    return this.http.get<Blob>(`${this.apiServerUrl}/productmanager/pdfGenerate`,{ headers : headers,responseType : 
        'blob' as 'json'})
    }
    public stockPdf():Observable<Blob>{
        var authorization = 'Bearer '+sessionStorage.getItem("access_token");

         const headers = new HttpHeaders({ 'Content-Type': 'application/json',
         "Authorization": authorization, responseType : 'blob'});
    return this.http.get<Blob>(`${this.apiServerUrl}/productmanager/pdfStock`,{ headers : headers,responseType : 
        'blob' as 'json'})
    }
    public customersPdf():Observable<Blob>{
        var authorization = 'Bearer '+sessionStorage.getItem("access_token");

         const headers = new HttpHeaders({ 'Content-Type': 'application/json',
         "Authorization": authorization, responseType : 'blob'});
    return this.http.get<Blob>(`${this.apiServerUrl}/productmanager/pdfCustomers`,{ headers : headers,responseType : 
        'blob' as 'json'})
    }
    public reclamationPdf():Observable<Blob>{
        var authorization = 'Bearer '+sessionStorage.getItem("access_token");

         const headers = new HttpHeaders({ 'Content-Type': 'application/json',
         "Authorization": authorization, responseType : 'blob'});
    return this.http.get<Blob>(`${this.apiServerUrl}/productmanager/pdfReclamation`,{ headers : headers,responseType : 
        'blob' as 'json'})
    }
    public getStockByCategory(category:string):Observable<Stock[]>{
        return this.http.get<Stock[]>(`${this.apiServerUrl}/productmanager/getstock-category/${category}`)
    }
    public getStockByState(state:string):Observable<Stock[]>{
        return this.http.get<Stock[]>(`${this.apiServerUrl}/productmanager/getstock-state/${state}`)
    }
    
    public getCustomerLogins():Observable<CustomerLogin[]>{
        return this.http.get<CustomerLogin[]>(`${this.apiServerUrl}/productmanager/listCustomerLogins`)
    }
    public deleteCom(id:number){
        return this.http.delete(`${this.apiServerUrl}/productmanager/deleteCom/${id}`)
    }
    public kpis(date:string):Observable<Indicator>{
        return this.http.get<Indicator>(`${this.apiServerUrl}/productmanager/kpi/${date}`)
    }
    public chart(date:string):Observable<Reservation[]>{
        return this.http.get<Reservation[]>(`${this.apiServerUrl}/productmanager/reservations/${date}`)
    }
    public addReclamation(reclamation:Reclamation):Observable<Reclamation>{
        return this.http.post<Reclamation>(`${this.apiServerUrl}/productmanager/addReclamation`,reclamation);
    }
    public reclamations():Observable<Reclamation[]>{
        return this.http.get<Reclamation[]>(`${this.apiServerUrl}/productmanager/reclamations`);
    }
    public chart2(date:string):Observable<Reclamation[]>{
        return this.http.get<Reclamation[]>(`${this.apiServerUrl}/productmanager/reclamation/${date}`)
    }
    public getReservationByEmail(email:string):Observable<Reservation[]>{
        return this.http.get<Reservation[]>(`${this.apiServerUrl}/productmanager/customerReservation/${email}`)
    }
    public getCustomer(name:string,password:string):Observable<CustomerLogin>{
        return this.http.get<CustomerLogin>(`${this.apiServerUrl}/productmanager/getCustomer/${name}/${password}`)
    }
    public getStockId(name:string):Observable<number>{
        return this.http.get<number>(`${this.apiServerUrl}/productmanager/getStockId/${name}`)
    }
    public getRecalamtionByEmail(email:string):Observable<Reclamation[]>{
        return this.http.get<Reclamation[]>(`${this.apiServerUrl}/productmanager/customerReclamation/${email}`)

    }
    public addReclamSupport(reclamation:ReclamSupport):Observable<ReclamSupport>{
        return this.http.post<ReclamSupport>(`${this.apiServerUrl}/productmanager/addReclamSupport`,reclamation);
    }
    public getReclamSupport(cName:string):Observable<ReclamSupport[]>{
        return this.http.get<ReclamSupport[]>(`${this.apiServerUrl}/productmanager/getReclamsSupport/${cName}`);
    }
    public deleteReclamation(id:number){
        return this.http.delete(`${this.apiServerUrl}/productmanager/deleteReclamSupportById/${id}`)
    }
    public deleteAllReclam(){
        return this.http.delete(`${this.apiServerUrl}/productmanager/deleteReclamSupport`)
    }
    public editReclam(reclamation:Reclamation){
        return this.http.put(`${this.apiServerUrl}/productmanager/editReclam`,reclamation)
    }




}