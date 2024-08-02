import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero.model';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroHuman: Hero[] = [];
  heroDwarf: Hero[] = [];
  heroElf: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getTopHeroes();
  }

  getTopHeroes(): void {

    this.heroService.getTopHeroOfRace("human").subscribe({
      next: (res) => {
        console.log(res);
        this.heroHuman = res;
        console.log(this.heroHuman);
      },
    }
    )

    this.heroService.getTopHeroOfRace("dwarf").subscribe({
      next: (res) => {
        console.log(res);
        this.heroDwarf = res;
        console.log(this.heroHuman);
      },
    }
    )

    this.heroService.getTopHeroOfRace("elf").subscribe({
      next: (res) => {
        console.log(res);
        this.heroElf = res;
        console.log(this.heroHuman);
      },
    }
    )
  }
}