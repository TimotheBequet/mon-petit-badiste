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
}
