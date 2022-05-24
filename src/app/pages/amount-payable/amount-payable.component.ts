import { Component, OnInit, Output, EventEmitter   } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-amount-payable',
  templateUrl: './amount-payable.component.html',
  styleUrls: ['./amount-payable.component.css']
})
export class AmountPayableComponent implements OnInit {

  @Output() viewShow: EventEmitter<string> = new EventEmitter();
  
  public img: any;

  public nombreApellido:string = '';
  public rut:string = '';
  public email:string = '';
  public telefono:string = '';

  opcionSeleccionado: string  = '0';
  verSeleccion: string        = '0';
  
  public validateCon:Boolean = true;

  constructor(private fb: FormBuilder, private router:Router) { 
    this.img = '';
    if(localStorage.getItem('image') != null){
      this.img = localStorage.getItem('image');
    }
  }

  public searchForm = this.fb.group({
    nombre: ['', [Validators.required]],
    rut: ['', [Validators.required]],
    correo: ['', [Validators.required]],
    telefono: ['', [Validators.required]]
  });

  ngOnInit(): void {
  }

  nextToPage(){
    this.viewShow.emit('paymentModel');
  }

  selectToamount(amount: string){
    localStorage.setItem('amount',amount);
  }


  capturar(){
    console.log(this.opcionSeleccionado);
    this.verSeleccion = this.opcionSeleccionado;
  }
}
