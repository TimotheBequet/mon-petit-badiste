import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-retour',
  templateUrl: './button-retour.component.html',
  styleUrls: ['./button-retour.component.scss']
})
export class ButtonRetourComponent {
  @Input('link') link = '';
}
