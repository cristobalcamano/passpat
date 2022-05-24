import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { Data } from '@angular/router';

@Component({
  selector: 'app-payment-model',
  templateUrl: './payment-model.component.html',
  styleUrls: ['./payment-model.component.css']
})
export class PaymentModelComponent implements OnInit {

  @Output() viewShow: EventEmitter<string> = new EventEmitter();

  namecompay:any;
  validateTC:boolean;
  amount: any;
  imgCD: string;
  fechaE: string;
  cvv: string;
  fechaEValidate: string;
  numberCD: any;
  validateInscripcion: boolean;

  constructor() {
    this.cvv = '';
    this.validateInscripcion = false;
    this.fechaE = '';
    this.fechaEValidate = '';
    this.validateTC = false;
    this.numberCD = null;
    this.imgCD = '../../../assets/img/credit-card/tarjetas-credito-logo.PNG';
    this.namecompay = '';
    if(localStorage.getItem('name') != null){
      this.namecompay = localStorage.getItem('name');
    }
    if(localStorage.getItem('amount') != null){
      this.amount = localStorage.getItem('amount');
    }
  }

  ngOnInit(): void {
    
  }

  validateCD(){
    this.cvv = '';
    this.fechaE = '';
    if(this.numberCD !== null && this.numberCD.length > 5){
      console.log(this.numberCD.charAt(0));
      if(this.numberCD.charAt(0) == 3){
        this.imgCD = '../../../assets/img/credit-card/a.png';
      } else if(this.numberCD.charAt(0) == 4){
        this.imgCD = '../../../assets/img/credit-card/v.png';
      }  else if(this.numberCD.charAt(0) == 5){
        this.imgCD = '../../../assets/img/credit-card/mc.png';
      }  else if(this.numberCD.charAt(0) == 6){
        this.imgCD = '../../../assets/img/credit-card/d.png';
      } 
      if (this.numberCD.length == 16){
        this.validateTC = true;
      } else {
        this.validateTC = false;
      }

    }else{
      this.validateTC = false;
      this.imgCD = '../../../assets/img/credit-card/tarjetas-credito-logo.PNG';
    }
  }

  validateFE(){
    
    if(this.fechaEValidate.length == 1 && this.fechaE.length == 2){
      this.fechaE += '/';
    } else if (this.fechaEValidate.length == 3 && this.fechaE.length == 2){
      this.fechaE = this.fechaE.substring(0,1);
    }
  
    this.fechaEValidate = this.fechaE;

  }

  inscribirTarjeta(){
    const data:Data = {
    }
  }

}
