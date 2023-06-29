import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button-move',
  templateUrl: './button-move.component.html',
  styleUrls: ['./button-move.component.scss']
})
export class ButtonMoveComponent implements OnInit {
  @Input() buttonCaption: string = '';

  constructor() {}

  ngOnInit() {}
}
