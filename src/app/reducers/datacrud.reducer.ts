import { InitialState } from '@ngrx/store/src/models';
import { datacrudModel } from '../datacrud.model';
import { ActionParent, crudType } from '../action/datacrud.action';

export const InitalizeState: datacrudModel[] = [
  { title: 'jay', description: 'data', id: 1 },
];

export function datacrudReducer(state = InitalizeState, action: ActionParent) {
  switch (action.type) {
    case crudType.Add: {
      return [...state, action.payload];
    }
    default:
      state;
  }
  return state;
}
