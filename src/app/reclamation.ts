import { Time } from "@angular/common";
import { ProductC } from "./productC";

export class Reclamation{
    public id:number;
    public clientName:string;
    public clientEmail:string;
    public codeCommand:number;
    public productClaimeds:ProductC[];
    public date:string;
    public time:Date;
    public etat:string;
    public dateCloture:string;
}