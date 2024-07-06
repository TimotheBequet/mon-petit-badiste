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
  
  constructor(public dialogRef: MatDialogRef<ListPlayersComponent>,
              @Inject(MAT_DIALOG_DATA) public data: PlayerInterface[]) {}

  ngOnInit() {
    //
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
