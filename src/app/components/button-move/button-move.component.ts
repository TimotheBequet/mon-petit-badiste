import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button-move',
  templateUrl: './button-move.component.html',
  styleUrls: ['./button-move.component.scss']
})
export class ButtonMoveComponent implements OnInit {
  @Input() buttonCaption: string = '';
  @Input() disabled: boolean = false;
  @Input() type: string = 'button';
  @Input() class: string = '';

  constructor() {}

  ngOnInit() {}
}
