import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';
import { Data } from '../../models/data.model';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})
export class LoadComponent implements OnInit {

  data: Data;

  constructor(private cardService: CardService) {
    this.data = new Data('','','',12,'','','','',12,'','','','','','','');
 }

  ngOnInit(): void {

    this.enrollCard();
  }

  enrollCard(){
/*    this.cardService.registrartarjeta(this.data).subscribe((data: Company) => {
      this.companyO = data;
    }
    );*/
  }

}
