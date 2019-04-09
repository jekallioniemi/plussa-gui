import { Component, OnInit, ViewChild, ElementRef, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  @Input() text: string = "success";
  @Output() output = new EventEmitter();
  @ViewChild('alert') alert: ElementRef;

  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
  }

  constructor() { }

  ngOnInit() {
  }

}
