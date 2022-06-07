import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AmountPayable } from 'src/app/models/amount-payable/amount-payable.model';

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
  @Input() montoMaximoPeso: string = '0';
  @Input() montoMaximoUF: string = '0';


  public searchForm: FormGroup;

  @Output() viewShow: EventEmitter<string> = new EventEmitter();
  @Output() montoDebitar: EventEmitter<AmountPayable> = new EventEmitter();

  tipoMonedaSeleccionada: string = '';
  tipoMonto: string = '';
  selectUF: string = '';


  constructor(private fb: FormBuilder, private router: Router) {
    this.searchForm = this.createformGroup();
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    //this.rutValidate = '';
  }

  get selecionarMonto() { return this.searchForm.get('selecionarMonto'); }
  get montoSeleccionadoPeso() { return this.searchForm.get('montoSeleccionadoPeso'); }
  get montoSeleccionadoUF() { return this.searchForm.get('montoSeleccionadoUF'); }
  get montoDigitadoPeso() { return this.searchForm.get('montoDigitadoPeso'); }
  get montoDigitadoUF() { return this.searchForm.get('montoDigitadoUF'); }

  onSubmit() {
    let monto = '0';
    let moneda = '';
    //DOS MONEDAS
    if (this.monedaPeso == '1' && this.monedaUF == '1') {
      if (this.tipoMonedaSeleccionada == 'PESOS') {
        moneda = 'PESOS';
        if (this.tipoMonto == 'otro-monto') {
          monto = this.montoDigitadoPeso?.value;
        } else {
          monto = this.montoSeleccionadoPeso?.value;
        }
      } else if (this.tipoMonedaSeleccionada == 'UF') {
        moneda = 'UF';
        if (this.tipoMonto == 'otro-monto') {
          monto = this.montoDigitadoUF?.value;
        } else {
          monto = this.montoSeleccionadoUF?.value;
        }
      }
      //PESOS
    } else if (this.monedaPeso == '1' && this.monedaUF == '0') {
      moneda = 'PESOS';
      if (this.tipoMonto == 'otro-monto') {
        monto = this.montoDigitadoPeso?.value;
      } else {
        monto = this.montoSeleccionadoPeso?.value;
      }
      //UF
    } else if (this.monedaPeso == '0' && this.monedaUF == '1') {
      moneda = 'UF';
      if (this.tipoMonto == 'otro-monto') {
        monto = this.montoDigitadoUF?.value;
      } else {
        monto = this.montoSeleccionadoUF?.value;
      }
    }

    let amountPayable: AmountPayable = new AmountPayable(monto, moneda);
    this.montoDebitar.emit(amountPayable);
    this.viewShow.emit('amountPayable');
  }

  createformGroup() {
    return new FormGroup({
      selecionarMonto: new FormControl('',[]),
      montoSeleccionadoPeso: new FormControl('',[]),
      montoSeleccionadoUF: new FormControl('',[]),
      montoDigitadoPeso: new FormControl('',[]),
      montoDigitadoUF: new FormControl('',[]),
    });
  }

  ngOnInit(): void {
  }

  onChange(event: any) {
    this.tipoMonedaSeleccionada = event.target.value;
    this.tipoMonto = '';
    // console.log(event.target.value);
  }

  valorSeleccionado(event: any) {
    this.tipoMonto = event.target.value;
    // console.log(event.target.value,this.montoSeleccionadoUF?.value,event);
  }

  volver(){
    this.viewShow.emit('personalData');
  }

  
}
