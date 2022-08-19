import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { QrService } from 'src/app/services/qr.service';
import { PersonalData } from '../models/personal-data/personal-data.model';
import { Company } from 'src/app/models/company.model';
import { AmountPayable } from '../models/amount-payable/amount-payable.model';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  view = '';

  dashboard: boolean = true;
  amountPayable: boolean = false;
  paymentMethod: boolean = false;
  paymentModel: boolean = false;
  personalData: boolean = false;
  appLoad:  boolean = false;
  bankResponse: boolean = false;
  appBankResponse:boolean = false;

  id = '';
  serviceId = '';

  companyO : Company = new Company('','','',[],[],'0','0','0','0');

  constructor(private route: ActivatedRoute, private qr: QrService,
    private router:Router) {
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      }
    }

  ngOnInit(): void {
    this.searchId();
  }

  searchId(){
    
    this.route.params.subscribe((params) => this.id = params['id']);
    this.route.params.subscribe((params) => this.serviceId = params['idservice']);
    this.qr.consultaId(this.id, this.serviceId).subscribe((data: Company) => {
      this.companyO = data;
    });
  }

  content(view: string){
    this.view = view;
    this.dashboard = false;
    this.amountPayable = false;
    this.paymentMethod = false;
    this.paymentModel = false;
    this.personalData = false;
    this.appLoad= false;
    this.bankResponse = false;
    this.appBankResponse = false;

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
        // this.bankResponse = true;
        // this.amountPayable = true;
        // this.appBankResponse = true;
      break;
      case 'bankResponse':
        this.bankResponse = true;
      break;
      case 'appLoad':
        this.appLoad = true;
      break;
      case 'appBankResponse':
        this.appBankResponse = true;
      break;
    }
  }

  capturarData(personal:PersonalData){

    console.log('Persona: ',personal);
  }

  capturarMonto(monto:AmountPayable){

    console.log('Monto Debitar: ',monto);
  }

  onMouseMove(){
    if(this.appLoad){
      
        this.appLoad = false;
        this.appBankResponse = true;
        this.view = 'appBankResponse';

      
    }
    
  }

}
