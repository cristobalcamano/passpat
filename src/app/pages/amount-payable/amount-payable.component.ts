import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-amount-payable',
  templateUrl: './amount-payable.component.html',
  styleUrls: ['./amount-payable.component.css']
})
export class AmountPayableComponent implements OnInit {

  
  public img: any;

  public nombreApellido:string = '';
  public rut:string = '';
  public email:string = '';
  public telefono:string = '';
  
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
    this.router.navigate(['/payment-model']);
  }

  selectToamount(amount: string){
    localStorage.setItem('amount',amount);
  }

}
