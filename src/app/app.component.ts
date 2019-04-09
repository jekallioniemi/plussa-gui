import { Component, NgModule, Input, ComponentFactory, ComponentRef, ComponentFactoryResolver, ViewContainerRef, ChangeDetectorRef, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
import {AlertsComponent} from './alerts/alerts.component';
import {BrowserModule} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  
  title = 'plussa-gui';
  @ViewChild("alertContainer", { read: ViewContainerRef }) container;
  constructor(private resolver: ComponentFactoryResolver) {}

  createComponent(text) {
    this.container.clear(); 
    const factory: ComponentFactory = this.resolver.resolveComponentFactory(AlertsComponent);
    this.componentRef: ComponentRef = this.container.createComponent(factory);
  }



}
