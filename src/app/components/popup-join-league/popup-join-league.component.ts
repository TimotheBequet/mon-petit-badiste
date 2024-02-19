import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-join-league',
  templateUrl: './popup-join-league.component.html',
  styleUrls: ['./popup-join-league.component.scss']
})
export class PopupJoinLeagueComponent {

  code: string = '';
  btnCaptionAnnuler: string = 'Annuler';
  btnCaptionValider: string = 'Valider';

  constructor(public dialogRef: MatDialogRef<PopupJoinLeagueComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string) {}

  checkTailleCode(e: any): void {
    if (e != null) {
    console.log(e.target.value);
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
