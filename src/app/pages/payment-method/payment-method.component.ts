import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {

  @Output() viewShow: EventEmitter<string> = new EventEmitter();

  namecompay:any;
  amount: any;
  imgCD: string;
  numberCD: any;

  constructor(private router:Router) {
    this.numberCD = null;
    this.imgCD = '';
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
    }else{
      this.imgCD = '';
    }
  }

  redirectTarjeta(){
    this.viewShow.emit('paymentModel');
  }

  volver(){
    this.viewShow.emit('amountPayable');
  }



}
