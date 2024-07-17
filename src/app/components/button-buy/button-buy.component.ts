import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button-buy',
  templateUrl: './button-buy.component.html',
  styleUrls: ['./button-buy.component.scss']
})
export class ButtonBuyComponent {
  state: number = 0;

  onClick(): void {
    if (this.state == 0) {
      this.state = 1;
    } else {
      this.state = 0;
    }
  }
}
