import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  text = "Tekstiä...";

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
