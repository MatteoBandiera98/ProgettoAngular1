import { Component, OnInit } from '@angular/core';
import { Dati } from '../../models/dati.interface';

@Component({
  selector: 'app-audi',
  templateUrl: './audi.component.html',
  styleUrls: ['./audi.component.scss'],
})
export class AudiComponent implements OnInit {
  oggetti: Dati[] = [];

  constructor() {}

  ngOnInit(): void {
    this.getOggetti();
  }

  async getOggetti() {
    try {
      let response = await fetch('assets/db.json');
      let data = await response.json();
      this.oggetti = data.filter((car: Dati) => car.brand.toLowerCase() === 'audi');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  getCardClass(car: Dati): string {
    return car.available ? 'bg-success' : 'bg-danger';
  }
}

