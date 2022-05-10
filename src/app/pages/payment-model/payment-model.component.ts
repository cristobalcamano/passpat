import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-model',
  templateUrl: './payment-model.component.html',
  styleUrls: ['./payment-model.component.css']
})
export class PaymentModelComponent implements OnInit {

  namecompay:any;
  amount: any;
  imgCD: string;
  numberCD: any;

  constructor() {
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

}
