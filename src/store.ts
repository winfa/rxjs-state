import { Observable, Subject } from "rxjs";
import { mergeMap, scan } from "rxjs/operators";

class Store {
  private _action$ = new Subject<string>();
  private _state$: Observable<State>;

  constructor(initialState: State) {
    this._state$ = this._action$.pipe(
      scan(reducer, initialState),
    );
  }

  dispatch(action: string) {
    this._action$.next(action);
  }


}

const reducer = (state: State, action: string) => {
  if (action === 'xxxx') {
    return state;
  }

  return state;
}

interface State {
  [key: string]: any;
}
