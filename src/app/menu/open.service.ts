import { Injectable } from '@angular/core';

@Injectable()
export class OpenService {

  isOpen: boolean;

  constructor() { }

  toggle() {
    this.isOpen = !this.isOpen;
  }

}
