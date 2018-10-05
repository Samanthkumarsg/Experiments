import { Injectable } from "@angular/core";

import { Observable, of } from "rxjs";

import { Hero } from "./hero";
import { Heroes } from "./mock.heroes";
import { MessagesService } from "./messages.service";

@Injectable({ providedIn: "root" })
export class HeroService {
  constructor(private messageService: MessagesService) {}

  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add("HeroService: fetched heroes");
    return of(Heroes);
  }

  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(Heroes.find(hero => hero.id === id));
  }
}
