import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-form-title',
  templateUrl: './form-title.component.html',
  styleUrls: ['./form-title.component.scss']
})
export class FormTitleComponent implements OnInit {

  @Input() formTitle: string

  constructor() { }

  ngOnInit() {
  }

}
