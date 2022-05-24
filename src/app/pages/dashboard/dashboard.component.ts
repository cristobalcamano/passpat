import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { QrService } from 'src/app/services/qr.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Output() viewShow: EventEmitter<string> = new EventEmitter();

  constructor(private route: ActivatedRoute, private qr: QrService,
    private router:Router) { 
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      }
    }

  siguiente = 'Siguiente';
  cont = 1;
  title = '';
  content = '';
  imgFirst = "../../../assets/img/webpay.PNG";
  imgSecond = "";
  id = '';

  ngOnInit(): void {
    this.searchId();
    this.first();
  }

  searchId(){
    this.route.params.subscribe((params) => this.id = params['id']);
    this.qr.consultaId(this.id).subscribe((data: Company) => {
      localStorage.setItem('image',data.imagen);
      localStorage.setItem('name',data.nombre);
    });


  }

  nextpresentation(){
    this.cont++;
    
    if(this.cont == 2){
      this.second();
    } else if(this.cont == 3){
      this.third();
    } else if(this.cont == 4){
      this.fourth();
    } else if(this.cont == 5){
      console.log('Emitir dhsboard');
      this.viewShow.emit('personalData');
    }
    
  } 

  first(){
    this.title = 'Suscribe tu pago automático';
    this.content = 'Ahorra tiempo y suscribe el pago \n automático a tu tarjeta en' 
    +' simples pasos.';
    
    this.imgSecond = "../../../assets/img/img1.PNG";
    
  }
  second(){
    this.title = 'Registra tus datos personales';
    this.content = 'Registra tus datos para poder entregarte una' 
    +' experiencia más personalizada.';
    
    this.imgSecond = "../../../assets/img/img2.PNG";
    
  }
  third(){
    this.title = 'Selecciona un monto a pagar';
    this.content = 'Selecciona un monto a pagar y la periodicidad' 
    +' simples pasos.';
    
    this.imgSecond = "../../../assets/img/img3.PNG";
    
  }
  fourth(){
    this.title = 'Selecciona el medio de pago y confirma';
    this.content = 'Recuerda que en el medio de pago seleccionado se' 
    +' se realizarán los cobrosmensuales.';
    
    this.imgSecond = "../../../assets/img/img4.PNG";
    this.siguiente = 'Comenzar';

  }

}
