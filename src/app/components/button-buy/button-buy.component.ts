import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-buy',
  templateUrl: './button-buy.component.html',
  styleUrls: ['./button-buy.component.scss']
})
export class ButtonBuyComponent {
  state: number = 0;
  @Input('prix') prix: number = 0;
  @Input('budget') budget: number = 0;
  @Input('idPlayer') idPlayer: number | undefined = undefined;
  @Input('playerDejaAchete') playerDejaAchete: boolean = false;
  @Output() montantAchat = new EventEmitter<number>();
  @Output() playersSelected = new EventEmitter<number>();
  // voir pour récupérer la liste des joueurs qu'on a supprimé, et faire un update pour les virer

  onClick(): void {
    if (!this.playerDejaAchete) {          
      if (this.state == 0) {
        this.state = 1;
        this.montantAchat.emit(this.prix);
      } else {
        this.state = 0;
        this.montantAchat.emit(this.prix * -1);
      }
      this.playersSelected.emit(this.idPlayer);
    } else {
      this.state = 0;
      this.montantAchat.emit(this.prix * -1);
      this.playersSelected.emit(this.idPlayer);
      this.playerDejaAchete = false;
    }
  }

  getFontIcon(): string {
    if (this.playerDejaAchete) {
      return 'price_check';
    } else if (this.state == 1) {
      return 'task_alt';      
    } else if (this.budget < this.prix) {
      return 'money_off';
    } else {
      return 'add_shopping_cart';
    }
  }
}
