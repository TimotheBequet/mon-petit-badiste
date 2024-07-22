import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { PlayerInterface } from 'src/app/interfaces/player.interface';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Input('type') type: string = '';
  @Input('listClubs') listClubs: PlayerInterface[] = [];
  @ViewChild('name') nameEl!: ElementRef; 
  selClub: number = 0;
  selGender: string = '';
  selSpe: string = '';
  @Output() idClub = new EventEmitter<number>();
  @Output() gender = new EventEmitter<string>();
  @Output() name = new EventEmitter<string>();
  @Output() spe = new EventEmitter<string>();

  setSelectionClub(): void {
    this.idClub.emit(this.selClub);
  }

  setSelectionGender(): void {
    this.gender.emit(this.selGender);
  }

  setFilterName(): void {
    this.name.emit(this.nameEl.nativeElement.value);
  }

  setSpeciality(): void {
    this.spe.emit(this.selSpe);
  }
}
