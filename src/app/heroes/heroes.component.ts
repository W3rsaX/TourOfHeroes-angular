import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Hero } from '../hero.model';
import { HeroService } from '../hero.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroes.model',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],

})
export class HeroesComponent implements OnInit {

  isCreateHero: boolean = true;
  nameControl = new FormControl('', [Validators.required, Validators.maxLength(24)]);
  powerControl = new FormControl('', [Validators.required, Validators.max(100), Validators.min(0)]);
  raceControl = new FormControl('', Validators.required);
  hero: any;
  protected gender;


  form = new FormGroup({
    nameControl: this.nameControl,
    powerControl: this.powerControl,
    raceControl: this.raceControl
  })

  constructor(private heroService: HeroService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.hero = this.activatedRoute.snapshot.data['hero'];
    console.log(this.hero);

    if (this.hero && this.hero.id > 0) {
      this.isCreateHero = false;
      this.gender = this.hero.gender
    } else {
      this.isCreateHero = true;
      this.hero.power = '';
    }
  }

  selectGender(gender: string): void {
    this.hero.gender = gender;
  }

  clearForm() {
    this.hero.id = 0;
    this.hero.name = '';
    this.hero.gender = '';
    this.gender = '';
    this.hero.power = '';
    this.hero.race = '';
    console.log("Clear");
  }

  saveHero(heroForm: NgForm): void {
    if (this.form.valid) {
      if (this.isCreateHero) {
        console.log(this.hero);
        this.heroService.saveHero(this.hero).subscribe(
          {
            next: (res: Hero) => {
              console.log(res);
              heroForm.reset();
              this.router.navigate(["/hero-list"]);
            },
            error: (err: HttpErrorResponse) => {
              console.log(err);
            }
          }
        );
      } else {
        this.heroService.updateHero(this.hero).subscribe(
          {
            next: (res: Hero) => {
              this.router.navigate(["/hero-list"]);
            },
            error: (err: HttpErrorResponse) => {
              console.log(err);
            }
          }
        );
      }
    }
  }
}