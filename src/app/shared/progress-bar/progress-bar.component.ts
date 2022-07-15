import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {


  money: boolean = false;
  user: boolean = false;
  check: boolean = false;

  @Input() imgIcon: string;

  constructor() {
    this.imgIcon = '';
  }

  ngOnInit(): void {
  }

}