import { Time } from "@angular/common";

export class OrderResponse{
    id:number;
    name:string;
    email:string;
    date:Date;
    time:Time
    address:string;
    region:string;
    ville:string;
    productName:string;
    productQte:number;
    productPrice:number;
    total:number;
}