import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit {

  @Output() viewShow: EventEmitter<string> = new EventEmitter();

  public img: any;
  public validateCon:Boolean = true;

  createformGroup(){
    return new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z ]+$/)]),
      rut: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(/^[1-9 ]+$/)]),
      rut2: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern(/^[1-9 ]+$/)]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern(/^[1-9 ]+$/)]),
      telefono2: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^[1-9 ]+$/)])
    });
  }

  get nombre() { return this.searchForm.get('nombre'); }
  get rut() { return this.searchForm.get('rut'); }
  get correo() { return this.searchForm.get('correo'); }
  get telefono() { return this.searchForm.get('telefono'); }

  public searchForm : FormGroup;

  constructor(private fb: FormBuilder, private router:Router) { 
    this.searchForm = this.createformGroup();
    this.img = '';
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    if(localStorage.getItem('image') != null){
      this.img = localStorage.getItem('image');
    }
  }

  ngOnInit(): void {
    
  }

  //    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  

  onSubmit(){
    console.log('Emitir');
    this.viewShow.emit('amountPayable');
  }

}
