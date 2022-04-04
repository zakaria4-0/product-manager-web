import { Component, OnInit } from '@angular/core';
import { ProductManagerService } from '../productManager.service';
import { Reclamation } from '../reclamation';

@Component({
  selector: 'app-list-reclam',
  templateUrl: './list-reclam.component.html',
  styleUrls: ['./list-reclam.component.css']
})
export class ListReclamComponent implements OnInit {
  public reclamations:Reclamation[];
  userName='';

  constructor(private service:ProductManagerService) { }

  ngOnInit(): void {
    this.userName=sessionStorage.getItem("loggedUser");
    this.getReclamations();
  }
  public getReclamations(){
    this.service.reclamations().subscribe(
      (response:Reclamation[])=>{
        this.reclamations=response;
      },
      error=>{
        console.log("exception occured");
      }
      
    )
  }
  public searchReclamation(key: any):void{
    const results:Reclamation[]=[];
    for(const reclam of this.reclamations){
      if(reclam.clientName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || reclam.clientEmail.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || reclam.codeCommand==key
      || reclam.id==key
      || reclam.date.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || reclam.time==key
      ){
        results.push(reclam);

      }
    }
    this.reclamations=results;
    if(results.length==0 || !key){
      this.getReclamations();
    }
  }
  public reclamationPdf(){
    this.service.reclamationPdf().subscribe(
      (data:Blob)=>{
        var file = new Blob([data], { type: 'application/pdf' })
        var fileURL = URL.createObjectURL(file);
        //window.open(fileURL); 
          var a         = document.createElement('a');
          a.href        = fileURL; 
          a.target      = '_blank';
          a.download    = 'List-of-reclamations.pdf';
          document.body.appendChild(a);
          a.click();
        console.log("pdf generated successfully")
      },
      error=>{
        console.log("pdf failed to generate")
      }
    )
  }

}
