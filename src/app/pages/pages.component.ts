import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  dashboard: boolean = true;
  amountPayable: boolean = false;
  paymentMethod: boolean = false;
  paymentModel: boolean = false;
  personalData: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  content(view: string){
    console.log('Emitir content');
    this.dashboard = false;
    this.amountPayable = false;
    this.paymentMethod = false;
    this.paymentModel = false;
    this.personalData = false;

    switch(view){
      case 'dashboard':
        this.dashboard = true;
      break;
      case 'amountPayable':
        this.amountPayable = true;
      break;
      case 'paymentMethod':
        this.paymentMethod = true;
      break;
      case 'paymentModel':
        this.paymentModel = true;
      break;
      case 'personalData':
        this.personalData = true;
      break;
    }
  }

}
