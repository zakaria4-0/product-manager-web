import { Time } from "@angular/common";
import { Product } from "./product";

export class Reservation{
    id:number;
    name:string;
    email:string;
    ville:string;
    address:string;
    region:string;
    products:Product[];
    date:string;
    time:Time;
    total:number;
}