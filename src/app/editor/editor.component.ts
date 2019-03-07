import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  private text: String;

  constructor() { }

  getText() {
    return this.text;
  }

  setText(text) {
    this.text = text;
  }

  ngOnInit() {
  }

}
