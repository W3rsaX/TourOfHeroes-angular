import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from './hero.model';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class HeroService {

  api= "http://localhost:8080";

  constructor(private httpClient: HttpClient) {

   }

   public saveHero(hero: Hero): Observable<Hero> { 
    return this.httpClient.post<Hero>(`${this.api}/hero/save`, hero)
   }

   public getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.api}/hero/get`);
   }

   public getTopHeroOfRace(heroRace: String):  Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.api}/hero/get/${heroRace}`);
   }

   public deleteHero(heroId: number) {
    return this.httpClient.delete(`${this.api}/hero/delete/${heroId}`)
   }

   public getHero(heroId: number) {
    return this.httpClient.get<Hero>(`${this.api}/hero/get/${heroId}`);
   }

   public updateHero(hero: Hero): Observable<Hero> {
    return this.httpClient.put<Hero>(`${this.api}/hero/update`, hero)
   }
}