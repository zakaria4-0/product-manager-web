import { HtmlParser } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductManagerService } from '../productManager.service';
import { Stock } from '../stock';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }
}
