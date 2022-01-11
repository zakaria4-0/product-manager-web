import { HttpBackend, HttpClient, HttpDownloadProgressEvent, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";


import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Admin } from "./admin";
import { Command } from "./command";
import { Customer } from "./customer";
import { CustomerLogin } from "./customerLogin";
import { OrderResponse } from "./orderResponse";
import { Product } from "./product";
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

    public registrationCustomer(customer:Customer):Observable<Customer>{
        return this.http.post<Customer>(`${this.apiServerUrl}/productmanager/registercustomer`,customer)

    }

    public customerPlaceOrder(reservation:Reservation):Observable<Reservation>{
        return this.http.post<Reservation>(`${this.apiServerUrl}/productmanager/customerplaceorder`,reservation)

    }

    public customerLoginPlaceOrder(reservation:Reservation):Observable<Reservation>{
        return this.http.post<Reservation>(`${this.apiServerUrl}/productmanager/customerloginplaceorder`,reservation)

    }
    public getInfo():Observable<OrderResponse[]>{
        return this.http.get<OrderResponse[]>(`${this.apiServerUrl}/productmanager/getinfo`)

    }
    public postCommand(command:Command):Observable<Command[]>{
        return this.http.post<Command[]>(`${this.apiServerUrl}/productmanager/command`,command)

    }
    public postCommandLogin(command:Command):Observable<Command[]>{
        return this.http.post<Command[]>(`${this.apiServerUrl}/productmanager/commandLogin`,command)

    }
    public getCommand(cname:string):Observable<Product[]>{
        return this.http.get<Product[]>(`${this.apiServerUrl}/productmanager/getCommand/${cname}`)
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
    public getStockByCategory(category:string):Observable<Stock[]>{
        return this.http.get<Stock[]>(`${this.apiServerUrl}/productmanager/getstock-category/${category}`)
    }
    public getStockByState(state:string):Observable<Stock[]>{
        return this.http.get<Stock[]>(`${this.apiServerUrl}/productmanager/getstock-state/${state}`)
    }
    






}