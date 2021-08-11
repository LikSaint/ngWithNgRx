import {createAction, createFeatureSelector, createReducer, createSelector, on, props} from '@ngrx/store';
import {Hero} from '../hero';

export const HEROES_KEY = 'heroes';

export const addHero = createAction(`[${HEROES_KEY}] add hero`, props<{hero: Hero}>());
export const deleteHero = createAction(`[${HEROES_KEY}] delete hero`, props<{heroId: number}>());
export const clear = createAction(`[${HEROES_KEY}] clear`);
export const changeUpdatedAt = createAction(
  `[${HEROES_KEY}] change updated at`,
  props<{updatedAt: number}>());

export interface HeroesState {
  heroes: Hero[];
  updatedAt?: number;
}

export const initialState: HeroesState = {
  heroes: [],
};

export const heroesReducer = createReducer(
  initialState,
  on(addHero, (state, action) => ({
    ...state,
    heroes: [...state.heroes, action.hero],
  })),
  on(deleteHero, (state, action) => ({
    ...state,
    heroes: state.heroes.filter(hero => hero.id !== action.heroId),
  })),
  on(clear, state => ({
    ...state,
    heroes: []
  })),
  on(changeUpdatedAt, (state, action) => ({
    ...state,
    updatedAt: action.updatedAt
  })),
);

export const featureSelector = createFeatureSelector<HeroesState>(HEROES_KEY);

export const heroesListSelector = createSelector(
  featureSelector,
  state => state.heroes
);

export const heroesCountSelector = createSelector(
  featureSelector,
  state => state.heroes.length
);

export const updatedAtSelector = createSelector(
  featureSelector,
  state => state.updatedAt
);
