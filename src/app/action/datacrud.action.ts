import { Action } from '@ngrx/store';
import { datacrudModel } from '../datacrud.model';

export enum crudType {
  Add = 'Add',
  Remove = 'Remove',
}

export class ActionParent implements Action {
  type: any;
  payload: any;
}

export class CrudAdd implements ActionParent {
  type = crudType.Add;
  constructor(public payload: any) {}
}

export class CrudRemove implements ActionParent {
  type = crudType.Add;
  constructor(public payload: any) {}
}
