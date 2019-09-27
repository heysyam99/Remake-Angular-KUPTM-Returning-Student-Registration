import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-form-instruction',
  templateUrl: './form-instruction.component.html',
  styleUrls: ['./form-instruction.component.scss']
})
export class FormInstructionComponent implements OnInit {

  @Input() formInstruction: string

  constructor() { }

  ngOnInit() {
  }

}
