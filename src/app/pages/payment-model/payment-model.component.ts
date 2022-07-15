import { Component, OnInit,Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Data } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-model',
  templateUrl: './payment-model.component.html',
  styleUrls: ['./payment-model.component.css']
})
export class PaymentModelComponent implements OnInit {

  @ViewChild('cvv') tagCvv : ElementRef | undefined;

  @Output() viewShow: EventEmitter<string> = new EventEmitter();

  @Input() img: string = '';

  tarjetaX: string = 'XXXX XXXX XXXX XXXX';
  fechaX: string = 'XX/XX';

  tarjetaChangeval: boolean = false;
  showCvv: boolean = true;

  termsconditios: boolean = false;

  createformGroup(){
    return new FormGroup({
      tarjeta: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^\d\d\d\d \d\d\d\d \d\d\d\d \d\d\d\d$/i)]),
      cvv: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern(/^(\d\d\d)+$/)]),
      fechaV: new FormControl('', [Validators.required, Validators.pattern(/^(01||02||03||04||05||06||07||08||09||10||11||12)\/\d\d$/i)]),
      termsconditions: new FormControl('', [Validators.required, Validators.requiredTrue])
    });
  }

  public searchForm : FormGroup;

  get tarjeta() { return this.searchForm.get('tarjeta'); }
  get cvv() { return this.searchForm.get('cvv'); }
  get fechaV() { return this.searchForm.get('fechaV'); }

  namecompay:any;
  validateTC:boolean;
  amount: any;
  imgCD: string;
  fechaE: string;
  
  fechaEValidate: string;
  validateInscripcion: boolean;

  tarjetaValidate = '';

  constructor(private renderer:Renderer2) {
    
    this.validateInscripcion = false;
    this.fechaE = '';
    this.fechaEValidate = '';
    this.validateTC = false;
    
    this.imgCD = '../../../assets/img/credit-card/tarjetas-credito-logo.PNG';
    this.namecompay = '';
    this.searchForm = this.createformGroup();
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

    this.fotmarTargetCredit();
    
    this.fechaE = '';
    if(this.searchForm.get('tarjeta')?.value.length !== null && this.searchForm.get('tarjeta')?.value.length > 5){
      console.log(this.searchForm.get('tarjeta')?.value.charAt(0));
      if(this.searchForm.get('tarjeta')?.value.charAt(0) == 3){
        this.imgCD = '../../../assets/img/credit-card/a.png';
      } else if(this.searchForm.get('tarjeta')?.value.charAt(0) == 4){
        this.imgCD = '../../../assets/img/credit-card/v.png';
      }  else if(this.searchForm.get('tarjeta')?.value.charAt(0) == 5){
        this.imgCD = '../../../assets/img/credit-card/mc.png';
      }  else if(this.searchForm.get('tarjeta')?.value.charAt(0) == 6){
        this.imgCD = '../../../assets/img/credit-card/d.png';
      } 
      if (this.searchForm.get('tarjeta')?.value.length.length == 16){
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
    
    if(this.fechaEValidate.length == 1 && this.searchForm.get('fechaV')?.value.length == 2){
      this.searchForm.controls['fechaV'].setValue(this.searchForm.get('fechaV')?.value + '/');
    } 
    if (this.fechaEValidate.length == 3 && this.searchForm.get('fechaV')?.value.length == 2){
      this.searchForm.controls['fechaV'].setValue(this.searchForm.get('fechaV')?.value.substring(0,1));
    }

    this.fechaEValidate = this.searchForm.get('fechaV')?.value;

    this.fechaX = this.searchForm.get('fechaV')?.value;
    const cont: number = 5 - this.searchForm.get('fechaV')?.value.length;
    for (let index = 0; index < cont; index++) {
      if(this.searchForm.get('fechaV')?.value.length + index == 2 ){
        this.fechaX += '/';
      }else{
        this.fechaX += 'X';
      }
    }
    
  }

  inscribirTarjeta(){
    
    this.viewShow.emit('bankResponse');
    const data:Data = {
    }
    this.viewShow.emit('appLoad');
  }

  fotmarTargetCredit(){

    if(this.tarjetaValidate.length == 3 && this.searchForm.get('tarjeta')?.value.length == 4){
      this.searchForm.controls['tarjeta'].setValue(this.searchForm.get('tarjeta')?.value + ' ');
    } else if(this.tarjetaValidate.length == 5 && this.searchForm.get('tarjeta')?.value.length == 4){
      this.searchForm.controls['tarjeta'].setValue(this.searchForm.get('tarjeta')?.value.substring(0,3)); 
    }
    
    if(this.tarjetaValidate.length == 8 && this.searchForm.get('tarjeta')?.value.length == 9){
      this.searchForm.controls['tarjeta'].setValue(this.searchForm.get('tarjeta')?.value + ' ');
    } else if(this.tarjetaValidate.length == 10 && this.searchForm.get('tarjeta')?.value.length == 9){
      this.searchForm.controls['tarjeta'].setValue(this.searchForm.get('tarjeta')?.value.substring(0,8)); 
    }
    
    if(this.tarjetaValidate.length == 13 && this.searchForm.get('tarjeta')?.value.length == 14){
      this.searchForm.controls['tarjeta'].setValue(this.searchForm.get('tarjeta')?.value + ' ');
    } else if(this.tarjetaValidate.length == 15 && this.searchForm.get('tarjeta')?.value.length == 14){
      this.searchForm.controls['tarjeta'].setValue(this.searchForm.get('tarjeta')?.value.substring(0,14)); 
    }

    this.tarjetaX = this.searchForm.get('tarjeta')?.value;
    const cont: Number = 19 - this.searchForm.get('tarjeta')?.value.length;
    for (let index = 0; index < cont; index++) {
      if(this.searchForm.get('tarjeta')?.value.length + index == 4 ||
         this.searchForm.get('tarjeta')?.value.length + index == 9 || 
          this.searchForm.get('tarjeta')?.value.length + index == 14){
            this.tarjetaX += ' ';
      }else{
        this.tarjetaX += 'X';
      }
    }
    
    this.tarjetaValidate = this.searchForm.get('tarjeta')?.value;

  }

  onSubmit(){

  }

  changeTargeta(validate: number){
    if (validate != undefined) {
      if (validate == 1) {
        this.tarjetaChangeval = false;
      } else if (validate == 2) {
        this.tarjetaChangeval = false;
      } else if (validate == 3) {
        this.tarjetaChangeval = true;
      } 
    }
  }

  showPassword(): void{
    if(this.tagCvv == undefined){
      this.tagCvv = new ElementRef(null);
    }
    const cvv = this.tagCvv.nativeElement;

    if(this.showCvv){
      this.renderer.setAttribute(cvv, 'type','txt');
    }else{
      this.renderer.setAttribute(cvv, 'type','password');
    }
    this.showCvv = !this.showCvv;
  }

  back(){
    this.viewShow.emit('amountPayable');
  }

}
