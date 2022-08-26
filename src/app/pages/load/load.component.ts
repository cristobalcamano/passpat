import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AmountPayable } from 'src/app/models/amount-payable/amount-payable.model';
import { InscripcionTarjeta } from 'src/app/models/inscripcion-tarjeta/inscripcion.request.model';
import { DataResponseInscriptionCard } from 'src/app/models/inscripcion-tarjeta/response-inscription-card/data-response-inscription-card.model';
import { PaymentModel } from 'src/app/models/payment-model/payment-model.model';
import { PersonalData } from 'src/app/models/personal-data/personal-data.model';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})
export class LoadComponent implements OnInit {


  @Output() viewShow: EventEmitter<string> = new EventEmitter();
  @Input() inscripcion: InscripcionTarjeta = new InscripcionTarjeta(new PersonalData('','','',''),
  new AmountPayable('',''), new PaymentModel('','','',true));

  
  id = '';
  serviceId = '';

  constructor(private route: ActivatedRoute,private cardService:CardService,
    private router:Router) {
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      }
    }

  ngOnInit(): void {

    this.enrollCard();
    
  }

  enrollCard(){
    
    this.route.params.subscribe((params) => this.id = params['id']);
    this.route.params.subscribe((params) => this.serviceId = params['idservice']);
    this.cardService.registrartarjeta(this.inscripcion, this.id, this.serviceId).subscribe((data: DataResponseInscriptionCard) => {
      console.log('Esta es la data de el response inscripcoin tarjeta',data);
      if(data.data.urlVoucher === ""){
        this.viewShow.emit('appBankResponse');
      }else{
        window.location.href = data.data.urlVoucher;
      }
    });
  }

}
