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
      rut: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(/^([1-9]{9}-\d)+$/)]),
      correo: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)]),
      telefono: new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(18), Validators.pattern(/^(\+\s[1-9]{3}\s[1-9]{8,12})+$/)])
    });
  }

  rutValidate = '';
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
        if(this.rutValidate.length == 8 && this.searchForm.get('rut')?.value.length == 9){
          this.searchForm.controls['rut'].setValue(this.searchForm.get('rut')?.value+'-');
        } else if(this.rutValidate.length == 10 && this.searchForm.get('rut')?.value.length == 9){
          this.searchForm.controls['rut'].setValue(this.searchForm.get('rut')?.value.substring(0,8));
        }
        this.rutValidate = this.searchForm.get('rut')?.value;
      }

    validateTelefono(){
    
      //this.rut?.value
      if(this.telefonoValidate.length == 0 && this.searchForm.get('telefono')?.value.length == 1){
        this.searchForm.controls['telefono'].setValue('+ ' + this.searchForm.get('telefono')?.value);
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
  
}