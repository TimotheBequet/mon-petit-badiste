import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CompoTempInterface } from 'src/app/interfaces/compo-temp.interface';
import { PlayerInterface } from 'src/app/interfaces/player.interface';
import { LeaguesService } from 'src/app/services/leagues.service';
import moment from 'moment';

@Component({
  selector: 'app-list-players',
  templateUrl: './list-players.component.html',
  styleUrls: ['./list-players.component.scss']
})
export class ListPlayersComponent {
  btnCaptionAnnuler: string = 'Annuler';
  btnCaptionValider: string = 'Valider';
  players!: PlayerInterface[];
  savePlayers!: PlayerInterface[];
  playersTemp!: CompoTempInterface[];
  playersBought!: PlayerInterface[];
  budget: number = 0;
  clubs: PlayerInterface[] = [];
  nameFilter: string | undefined = undefined;
  clubFilter: number | undefined = undefined;
  genderFilter: string | undefined = undefined;
  specialityFilter: string | undefined = undefined;
  playersSelected: PlayerInterface[] = [];
  playersDeleted: PlayerInterface[] = [];
  idLeague: number = 0;
  idUser: number = 0;
  
  constructor(public dialogRef: MatDialogRef<ListPlayersComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _snackbar: MatSnackBar,
              private leaguesService: LeaguesService) {}

  ngOnInit() {
    this.players = this.data.players;
    this.savePlayers = this.players;
    this.playersTemp = this.data.playersTemp;
    this.playersBought = this.data.playersBought;
    this.budget = this.data.budget;
    this.idLeague = this.data.idLeague;
    this.idUser = this.data.idUser;

    this.clubs = [...new Map(this.players.map(player => [player['sigle'], player])).values()];
    
    if (this.playersBought != undefined) {
      this.players = this.players.filter((p1) => !this.playersBought.find((p2) => p2.id === p1.id));
      this.savePlayers = this.players;
    }

    if (this.playersTemp != undefined) {
      for (let player of this.players) {
        if (this.playersTemp.find((p) => p.idPlayer == player.id) != undefined) {
          player.dejaAchete = true;
        } else {
          player.dejaAchete = false;
        }
      }
    }
  }

  closeModal(): void {
    this.dialogRef.close(false);
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
    this.nameFilter = name;
    this.upddateFilters();
  }

  updateListPlayersByClub(id: number): void {
    this.clubFilter = id;
    this.upddateFilters();
  }

  updateListPlayersByGender(gender: string): void {
    this.genderFilter = gender;
    this.upddateFilters();
  }

  updateListPlayersBySpeciality(spe: string): void {
    this.specialityFilter = spe;
    this.upddateFilters();
  }

  upddateFilters(): void {
    this.players = this.savePlayers;
    if (this.nameFilter != undefined) {
      this.players = this.players.filter((player) => player.lastName.toUpperCase().includes(this.nameFilter!.toUpperCase()));
    }
    if (this.clubFilter != undefined) {
      this.players = this.players.filter((player) => player.idClub == this.clubFilter);
    }
    if (this.genderFilter != undefined) {
      this.players = this.players.filter((player) => player.sexe == this.genderFilter);
    }
    if (this.specialityFilter != undefined) {
      if (this.specialityFilter == 'S') {
        this.players = this.players.filter((player) => player.isSpecialisteSimple == 'O');
      } else if (this.specialityFilter == 'D') {
        this.players = this.players.filter((player) => player.isSpecialisteDouble == 'O');
      } else if (this.specialityFilter == 'X') {
        this.players = this.players.filter((player) => player.isSpecialisteMixte == 'O');
      }
    }
  }

  updatePlayersSelected(idPlayer: number): void {
    const player = this.playersSelected.find((player) => player.id == idPlayer);
    if (player != undefined) {
      this.playersSelected.splice(this.playersSelected.findIndex((p) => p.id == idPlayer), 1);
    } else {
      this.playersSelected.push(this.players.find((p) => p.id == idPlayer)!);
    }
  }

  updatePlayersDeleted(idPlayer: number): void {
    const player = this.playersDeleted.find((player) => player.id == idPlayer);
    if (player != undefined) {
      this.playersDeleted.splice(this.playersDeleted.findIndex((p) => p.id == idPlayer), 1);
    } else {
      this.playersDeleted.push(this.players.find((p) => p.id == idPlayer)!);
    }
  }

  validerAchats(): void {
    const messageRetour: string = this.checkBeforeValidate();
    if (!messageRetour) {
      const dateCourante: Date = new Date();
      let playersToSend: CompoTempInterface[] = new Array<CompoTempInterface>;
      for (let item of this.playersSelected) {
        playersToSend.push(
          <CompoTempInterface>{
            idUser: this.idUser,
            idLeague: this.idLeague,
            idPlayer: item.id,
            prixPlayer: item.prix,
            datePurchase: moment(dateCourante).format("YYYY-MM-DD HH:mm:ss")
          }
        );
      }
      let playersToDelete: CompoTempInterface[] = new Array<CompoTempInterface>;
      for (let item of this.playersDeleted) {
        playersToDelete.push(
          <CompoTempInterface>{
            idUser: this.idUser,
            idLeague: this.idLeague,
            idPlayer: item.id,
            prixPlayer: item.prix,
            datePurchase: moment(dateCourante).format("YYYY-MM-DD HH:mm:ss")
          }
        );
      }
      this.leaguesService.setCompoTemp(playersToSend, playersToDelete).subscribe((retour) => {
        if (retour) {
          this.dialogRef.close(true);
        } else {
          const config = new MatSnackBarConfig();
            config.panelClass = ['error'];
            config.verticalPosition = 'top';
            config.duration = 5000;
          this._snackbar.open('Une erreur est survenue lors de l\'enregistrement des achats.', 'Fermer', config);
        }
      });
    } else {
      const config = new MatSnackBarConfig();
            config.panelClass = ['error'];
            config.verticalPosition = 'top';
            config.duration = 5000;
          this._snackbar.open(messageRetour, 'Fermer', config);
    }
  }

  checkBeforeValidate(): string {
    /*if (this.playersBought == undefined || (this.playersBought != undefined && this.playersBought.length == 0)) {
      if (this.playersSelected.filter((p) => p.sexe == 'F').length < 3) {
        return "Il faut au moins 3 filles.";
      } else if (this.playersSelected.filter((p) => p.sexe == 'M').length < 3) {
        return "Il faut au moins 3 garçons.";
      }
    }*/
    return '';
  }
}
