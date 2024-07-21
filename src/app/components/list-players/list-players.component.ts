import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PlayerInterface } from 'src/app/interfaces/player.interface';

@Component({
  selector: 'app-list-players',
  templateUrl: './list-players.component.html',
  styleUrls: ['./list-players.component.scss']
})
export class ListPlayersComponent {
  btnCaptionAnnuler: string = 'Annuler';
  players!: PlayerInterface[];
  savePlayers!: PlayerInterface[];
  budget: number = 0;
  clubs: PlayerInterface[] = [];
  
  constructor(public dialogRef: MatDialogRef<ListPlayersComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.players = this.data.players;
    this.savePlayers = this.players;
    this.budget = this.data.budget;

    this.clubs = [...new Map(this.players.map(player => [player['sigleClub'], player])).values()];
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  getBudgetClass(): string {
    if (this.budget > 3000) {
      return 'budget-ok';
    } else if (this.budget > 1000 && this.budget <= 3000 ) {
      return 'budget-medium';
    } else {
      return 'budget-ko';
    }
  }

  updateMontantAchat(montant: number): void {
    this.budget = this.budget - montant;
  }

  updateListPlayersByName(name: string): void {
    this.players = this.savePlayers;
    if (name != undefined) {
      this.players = this.players.filter((player) => player.lastName.toUpperCase().includes(name.toUpperCase()));
    }
  }

  updateListPlayersByClub(id: number): void {
    this.players = this.savePlayers;
    if (id != undefined) {
      this.players = this.players.filter((player) => player.idClub == id);
    }
  }

  updateListPlayersByGender(gender: string): void {
    this.players = this.savePlayers;
    if (gender != undefined) {
      this.players = this.players.filter((player) => player.sexe == gender);
    }
  }

  updateListPlayersBySpeciality(spe: string): void {
    this.players = this.savePlayers;
    /*if (spe != undefined) {
      this.players = this.players.filter((player) => this.)
    }*/
  }
}
