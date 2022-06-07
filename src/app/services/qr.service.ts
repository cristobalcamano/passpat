import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Company } from 'src/app/models/company.model';

const url_base = environment.base_url;

@Injectable({
    providedIn: 'root'
})
export class QrService {

    constructor(private http: HttpClient,
        private router: Router){

    }

    consultaId(id:string, serviceId:string){
        const url = `${url_base}service/consulta/${id}/${serviceId}`;
        
        return this.http.get<Company>(url)
        .pipe(catchError( e =>{
            return throwError(e);
        }));

    }

}