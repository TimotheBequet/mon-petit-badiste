import { Component, Input } from '@angular/core';
import { CompoTempInterface } from 'src/app/interfaces/compo-temp.interface';
import { PlayerInterface } from 'src/app/interfaces/player.interface';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.scss'
})
export class PlayerCardComponent {
  @Input('player') player!: PlayerInterface;
  @Input('playerTemp') playerTemp!: CompoTempInterface;

  getSpecialite(p: PlayerInterface | CompoTempInterface): string {
    let retour: string = '';
    if (p.isSpecialisteSimple === 'O') {
      retour += ' Simple';
    }
    if (p.isSpecialisteDouble === 'O') {
      if (retour != '') {
        retour += ',';
      }
      retour += ' Double';
    }
    if (p.isSpecialisteMixte === 'O') {
      if (retour != '') {
        retour += ',';
      }
      retour += ' Mixte'; 
    }
    return 'Spécialité :' + retour;
  }

  getCountryUrl(p: PlayerInterface | CompoTempInterface): string {
    return "http://purecatamphetamine.github.io/country-flag-icons/3x2/" + p.pays + ".svg";
  }
}
