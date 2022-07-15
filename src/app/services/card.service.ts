import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Company } from 'src/app/models/company.model';
import { Data } from 'src/app/models/data.model';

const url_base = environment.base_url;

@Injectable({
    providedIn: 'root'
})
export class CardService {
    
    constructor(private http: HttpClient,
        private router: Router){

    }

    registrartarjeta(data:Data){
        const url = `${url_base}service/inscription-card`;
        
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
          };
        return this.http.post<Company>(url,data,httpOptions)
        .pipe(catchError( e =>{
            return throwError(e);
        }));

    }

}