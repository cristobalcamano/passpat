import { Component, OnInit, Output, EventEmitter, Input   } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-amount-payable',
  templateUrl: './amount-payable.component.html',
  styleUrls: ['./amount-payable.component.css']
})
export class AmountPayableComponent implements OnInit {

  @Input() img: string = '';
  @Input() montoPesos: string[] = [];
  @Input() montoUF: string[] = [];
  @Input() monedaPeso: string = '0';
  @Input() monedaUF: string = '0';

  public searchForm : FormGroup;

  @Output() viewShow: EventEmitter<string> = new EventEmitter();
  @Output() montoSeleccionado: EventEmitter<String> = new EventEmitter();

  tipoMonedaSeleccionada: string = '';
  tipoMonto: string = '';
  

  constructor(private fb: FormBuilder, private router:Router) { 
    this.searchForm = this.createformGroup();
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    //this.rutValidate = '';
  }

  onSubmit(){
    this.viewShow.emit('paymentModel');
  }

  createformGroup(){
    return new FormGroup({});
  }

  ngOnInit(): void {
  }

  onChange( event:any ){
    this.tipoMonedaSeleccionada = event.target.value;
    this.tipoMonto = '';
    console.log(event.target.value);
  }

  valorSeleccionado(event:any){
    this.tipoMonto = event.target.value;
    
  }
}
