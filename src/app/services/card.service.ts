import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Company } from 'src/app/models/company.model';
import { Data } from 'src/app/models/data.model';
import { Inscripcion } from '../models/inscripcion.model';
import { InscripcionTarjeta } from '../models/inscripcion-tarjeta/inscripcion.request.model';
import { DataResponseInscriptionCard } from '../models/inscripcion-tarjeta/response-inscription-card/data-response-inscription-card.model';

const url_base = environment.base_url;

@Injectable({
    providedIn: 'root'
})
export class CardService {
    
    constructor(private http: HttpClient,
        private router: Router){

    }

    registrartarjeta(data:InscripcionTarjeta ,id:string, serviceId:string){
        /*const url = `${url_base}service/inscription-card`;*/

        const url = `http://localhost:8081/api/v1/mandatodigital/service/inscripcion/${id}/${serviceId}`;

        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
          };
        return this.http.post<DataResponseInscriptionCard>(url,data,httpOptions)
        .pipe(catchError( e =>{
            return throwError(e);
        }));

    }

}