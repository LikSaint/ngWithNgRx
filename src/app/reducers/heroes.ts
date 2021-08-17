import {Action, ActionReducer, createAction, createFeatureSelector, createReducer, createSelector, on, props, State} from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {Hero} from '../hero';

export const HEROES_KEY = 'heroes';

export const addHero = createAction(`[${HEROES_KEY}] add hero`, props<{hero: Hero}>());
export const deleteHero = createAction(`[${HEROES_KEY}] delete hero`, props<{heroId: number}>());
export const clear = createAction(`[${HEROES_KEY}] clear`);
export const changeUpdatedAt = createAction(
  `[${HEROES_KEY}] change updated at`,
  props<{updatedAt: number}>());

export const heroAdapter: EntityAdapter<Hero> = createEntityAdapter<Hero>();

export interface HeroesState extends EntityState<Hero> {
  updatedAt?: number;
}

export const initialState: HeroesState = heroAdapter.getInitialState({
  ids: [],
  entities: {}
});

export const heroesReducer = createReducer(
  initialState,
  on(addHero, (state, action) => (
    heroAdapter.addOne(action.hero, state)
  )),
  on(deleteHero, (state, action) => (
    heroAdapter.removeOne(action.heroId, state)
  )),
  on(clear, state => (
    heroAdapter.removeAll(state)
  )),
  on(changeUpdatedAt, (state, action) => ({
    ...state,
    updatedAt: action.updatedAt
  })),
);

export function reducer(state: HeroesState | undefined, action: Action): HeroesState {
  return heroesReducer(state, action);
}

export const featureSelector = createFeatureSelector<HeroesState>(HEROES_KEY);
const {
  selectAll,
  selectTotal,
} = heroAdapter.getSelectors();

export const heroesListSelector = createSelector(
  featureSelector,
  selectAll
);

export const heroesCountSelector = createSelector(
  featureSelector,
  selectTotal
);

export const updatedAtSelector = createSelector(
  featureSelector,
  state => state.updatedAt
);
