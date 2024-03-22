import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dati } from '../../models/dati.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  oggetti: Dati[] = [];
  randomCars: Dati[] = [];
  randomCarsGenerated: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getOggetti().then((oggetti) => {
      this.oggetti = oggetti;
      if (!this.randomCarsGenerated) {
        this.generateRandomCars();
        this.randomCarsGenerated = true;
      }
    });
  }

  async getOggetti(): Promise<Dati[]> {
    let response = await fetch('assets/db.json');
    let data = await response.json();
    return data;
  }

  generateRandomCars() {
    const randomIndexes: number[] = [];
    while (randomIndexes.length < 2) {
      const randomIndex = Math.floor(Math.random() * this.oggetti.length);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }
    this.randomCars = randomIndexes.map(index => this.oggetti[index]);
  }

  goToBrand(brand: string) {
    switch (brand.toLowerCase()) {
      case 'audi':
        this.router.navigate(['/audi']);
        break;
      case 'ford':
        this.router.navigate(['/ford']);
        break;
      case 'fiat':
        this.router.navigate(['/fiat']);
        break;
      default:
        // Gestione caso non previsto
        break;
    }
  }
}
