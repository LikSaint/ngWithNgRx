import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map} from 'rxjs/operators';
import {addHero, changeUpdatedAt, clear, deleteHero} from './reducers/heroes';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions) {}

  updatedAt$ = createEffect(() => this.actions$.pipe(
    ofType(addHero, deleteHero, clear),
    map(() => changeUpdatedAt({updatedAt: Date.now()}))
  ));
}
