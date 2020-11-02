import { Observable, Subject } from "rxjs";
import { scan } from "rxjs/operators";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

export class Store {
  state$: Observable<State>;

  private _state$: BehaviorSubject<State>;
  private _action$ = new Subject<Action>();

  constructor(stateReducer: StateReducer<State>) {
    this._state$ = new BehaviorSubject<State>(stateReducer.state);
    this.state$ = this._state$.asObservable();
    this._action$.pipe(scan(stateReducer.reducer, stateReducer.state)).subscribe(this._state$);
  }

  get state() {
    return this._state$.value;
  }

  dispatch(action: Action) {
    this._action$.next(action);
  }
}

export function createReducer<TState>(initialState: TState, reducer: Reducer<TState>): StateReducer<TState> {
  return {
    state: initialState,
    reducer,
  };
}

export function createAction(name: string, props: { [key: string]: any }) {
  return {
    name,
    payload: props
  };
}

export interface State {

}

export interface StateReducer<TState> {
  state: TState;
  reducer: Reducer<TState>;
}

export interface Action {
  name: string,
  payload: { [key: string]: any };
}

export type Reducer<T> = (state: T, action: Action) => T;
