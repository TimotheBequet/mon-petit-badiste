import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    standalone: false
})
export class LoaderComponent {
  @HostBinding('className') componentClass: string;

  constructor() {
    this.componentClass = 'loader';
  }
}
