import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { QrService } from 'src/app/services/qr.service';
import { PersonalData } from '../models/personal-data/personal-data.model';
import { Company } from 'src/app/models/company.model';

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

  id = '';

  companyO : Company = new Company('','','',[]);

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
    this.qr.consultaId(this.id).subscribe((data: Company) => {
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

  capturarData(personal:PersonalData){

    console.log('Persona: ',personal);
  }

}
