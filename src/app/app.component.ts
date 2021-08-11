import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {addHero, clear, deleteHero, heroesCountSelector, heroesListSelector, updatedAtSelector} from './reducers/heroes';
import {HeroesApi} from './heroesApi';
import {Hero} from './hero';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  count$ = this.store.select(heroesCountSelector);
  cannotAddNewHero$ = this.count$.pipe(map(count => count >= 10));
  updatedAt$ = this.store.select(updatedAtSelector);
  heroesList$ = this.store.select(heroesListSelector);

  constructor(
    private store: Store,
    private heroesApi: HeroesApi,
  ) {
  }

  public addHero(): void {
    const newHero = this.heroesApi.getNewHero();
    if (newHero) {
      this.store.dispatch(addHero({hero: newHero}));
    }
  }

  public deleteHero(hero: Hero): void {
    this.heroesApi.refreshHero(hero.id);
    this.store.dispatch(deleteHero({heroId: hero.id}));
  }

  public clear(): void {
    this.heroesApi.clearList();
    this.store.dispatch(clear());
  }
}
