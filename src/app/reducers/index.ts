import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {HEROES_KEY, heroesReducer, HeroesState} from './heroes';

export interface State {
  [HEROES_KEY]: HeroesState;
}

export const reducers: ActionReducerMap<State> = {
  [HEROES_KEY]: heroesReducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
