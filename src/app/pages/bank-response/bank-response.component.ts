import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bank-response',
  templateUrl: './bank-response.component.html',
  styleUrls: ['./bank-response.component.css']
})
export class BankResponseComponent implements OnInit {

  @Input() img: string = '';

  @Output() viewShow: EventEmitter<string> = new EventEmitter();

  closeResult = '';

  constructor(private modalService: NgbModal) {}

  open(content:any) {
    this.modalService.open(content, { windowClass : "myCustomModalClass"}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed}`;
    });
  }


  ngOnInit(): void {
  }

  printPage() {
    window.print();
  }

}
