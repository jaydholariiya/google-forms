import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { datacrudReducer } from './datacrud.reducer';

export interface State {}

export const reducers: ActionReducerMap<State> = {
  dataCrud: datacrudReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
