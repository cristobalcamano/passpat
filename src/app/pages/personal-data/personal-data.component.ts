import { Component, OnInit, Input , Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonalData } from '../../models/personal-data/personal-data.model';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit {

  @Output() viewShow: EventEmitter<string> = new EventEmitter();
  @Output() dataPersonal: EventEmitter<PersonalData> = new EventEmitter();

  @Input() img: string = '';

  public validateCon:Boolean = true;

  createformGroup(){
    return new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^[a-zA-Z]{1,12}\s([a-zA-Z\s]{1,50})$/i)]),
      rut: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(10), Validators.pattern(/^([1-9]{7,8}\-[1-9]{1})+$/)]),
      correo: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)]),
      telefono: new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(15), Validators.pattern(/^(\+\s56[1-9]{1}\s[1-9]{8,9})+$/)])
    });
  }

  rutValidate = '';
  rutValidateFormatK = false;
  telefonoValidate = '';
  get nombre() { return this.searchForm.get('nombre'); }
  get rut() { return this.searchForm.get('rut'); }
  get correo() { return this.searchForm.get('correo'); }
  get telefono() { return this.searchForm.get('telefono'); }

  public searchForm : FormGroup;

  constructor(private fb: FormBuilder, private router:Router) { 
    this.searchForm = this.createformGroup();
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.rutValidate = '';
  }

  ngOnInit(): void {
    
  }

  onSubmit(){
    let personal:PersonalData = new PersonalData(this.searchForm.get('nombre')?.value,
    this.searchForm.get('rut')?.value,
    this.searchForm.get('correo')?.value, this.searchForm.get('telefono')?.value);
    this.dataPersonal.emit(personal);
    this.viewShow.emit('amountPayable');
  }

  validateRut(){
    
    //this.rut?.value
        //if(this.rutValidate.length == 6 && this.searchForm.get('rut')?.value.length == 7){
        //  this.searchForm.controls['rut'].setValue(this.searchForm.get('rut')?.value+'-');
        //} else if(this.rutValidate.length == 8 && this.searchForm.get('rut')?.value.length == 7){
        //  this.searchForm.controls['rut'].setValue(this.searchForm.get('rut')?.value.substring(0,6));
        //}
        this.rutValidate = this.searchForm.get('rut')?.value;
        if(this.searchForm.get('rut')?.value.length > 8){this.validarRut()}
      }

    validateTelefono(){
    
      //this.rut?.value
      if(this.telefonoValidate.length == 0 && this.searchForm.get('telefono')?.value.length == 1){
        this.searchForm.controls['telefono'].setValue('+ 56' + this.searchForm.get('telefono')?.value + ' ');
      } else if(this.telefonoValidate.length == 3 && this.searchForm.get('telefono')?.value.length == 2){
      this.searchForm.controls['telefono'].setValue('');
      }

      if(this.telefonoValidate.length == 4 && this.searchForm.get('telefono')?.value.length == 5){
        this.searchForm.controls['telefono'].setValue(this.searchForm.get('telefono')?.value + ' ');
      } else if(this.telefonoValidate.length == 6 && this.searchForm.get('telefono')?.value.length == 5){
      this.searchForm.controls['telefono'].setValue(this.searchForm.get('telefono')?.value.substring(0,4)); 
      }

    this.telefonoValidate = this.searchForm.get('telefono')?.value;
  }

  n_dv = 0;
  getDV(){
    let suma = 0;
    if(this.searchForm.get('rut')?.value.length == 9){
      var nuevo_numero = this.searchForm.get('rut')?.value.toString().substring(0,7).split("");
    } else {
      var nuevo_numero = this.searchForm.get('rut')?.value.toString().substring(0,8).split("");
    }
    
    for(let i=0,j=2; i < nuevo_numero.length; i++, ((j==7) ? j=2 : j++)) {
      if(nuevo_numero[nuevo_numero.length-(i+1)] != '-' && nuevo_numero[nuevo_numero.length-(i+1)] != 'k'){
        
            suma += (parseInt(nuevo_numero[nuevo_numero.length-(i+1)]) * j); 
        
      }
    }
    this.n_dv = 11 - (suma % 11);
    
    return ((this.n_dv == 11) ? 0 : ((this.n_dv == 10) ? "K" : this.n_dv));
}

  validarRut() {
    if(this.searchForm.get('rut')?.value.length == 9){
      var rutValidator = this.searchForm.get('rut')?.value.toString().substring(8,9);
    } else {
      var rutValidator = this.searchForm.get('rut')?.value.toString().substring(9,10);
    }

    if(this.getDV().toString().toUpperCase() === rutValidator.toString().toUpperCase()){
      this.rutValidateFormatK = true;
    } else {
      this.rutValidateFormatK = false;
    
    }
    
}
  
}