import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bank-response',
  templateUrl: './bank-response.component.html',
  styleUrls: ['./bank-response.component.css']
})
export class BankResponseComponent implements OnInit {

  @Input() img: string = '';

  @Output() viewShow: EventEmitter<string> = new EventEmitter();

  @ViewChild("endedProcess") endedProcess: ElementRef | undefined;

  myTimeout: ReturnType<typeof setTimeout> | undefined;

  closeResult = '';
  selectCalification = '';

  constructor(private modalService: NgbModal) { }

  open(content: any) {
    clearTimeout(this.myTimeout!);
    this.modalService.open(content, { windowClass: "myCustomModalClass" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed}`;
    });
  }

  openThankyou(thankyou: any, content: any) {
    this.modalService.dismissAll(content);
    this.modalService.open(thankyou, { windowClass: "modalClassThank" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed}`;
    });
  }


  ngOnInit(): void {
     this.myTimeout = setTimeout( () => {
     
     this.openEndedProcess();

    }, 10000);
  }

  printPage() {
    window.print();
  }

  changeSelectOption(event: any) {
    this.selectCalification = '';
    console.log(event.target.value);
    this.selectCalification = event.target.value;
  }

  openEndedProcess(){
    this.modalService.open(this.endedProcess, { windowClass: "modalClassEndedProcess" }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed}`;
      });

  }

  enviarOpinion() {

  }

  volverAlInicio(){
    location.reload();
  }

}


