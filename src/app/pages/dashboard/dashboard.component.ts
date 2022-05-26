import { Component, OnInit, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Output() viewShow: EventEmitter<string> = new EventEmitter();

  constructor() { 
    }

    siguiente: boolean = false;
    siguientetxt: string =  'Siguiente';
  cont = 1;
  id = '';

  ngOnInit(): void {
  }

  nextpresentation(){
    this.cont++;
    
    if(this.cont == 2){
      this.second();
    } else if(this.cont == 3){
      this.viewShow.emit('personalData');
    }
  } 

  second(){
    this.siguientetxt = 'Comenzar';
    this.siguiente = true;
  }

}
