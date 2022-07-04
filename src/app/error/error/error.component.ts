import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

title = 'Comercio o servicio del comercio no encontrado';

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const code = params['code'];
      if(code == '1'){
        this.title = 'opcion 3';
      }
      if(code == '2'){
        this.title = 'opcion 2';
      }
      if(code == '3'){
        this.title = 'opcion 3';
      }
    });
  }

}
