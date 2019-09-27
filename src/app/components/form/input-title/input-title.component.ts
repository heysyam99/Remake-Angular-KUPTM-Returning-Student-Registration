import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-title',
  templateUrl: './input-title.component.html',
  styleUrls: ['./input-title.component.scss']
})
export class InputTitleComponent implements OnInit {

  @Input() inputTitle: string

  constructor() { }

  ngOnInit() {
  }

}
