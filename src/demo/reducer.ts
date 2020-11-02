import { Action, createReducer, State, Store } from "../store";

export class User {
  id = "";
}

export interface UserState extends State, Array<User> {

}

const reducer = createReducer([] as UserState, (state, action) => {
  if (action.name === 'Add') {
    return [
      ...state,
      new User(),
    ];
  }

  if (action.name === 'Delete') {
    const userId = action.payload.userId;
    const userIndex = state.findIndex(user => user.id === userId);
    return [
      ...state.slice(0, userIndex - 1),
      ...state.slice(userIndex + 1),
    ];
  }

  if (action.name === 'Update') {
    const user = action.payload.user;
    const userIndex = state.findIndex(user => user.id === user.id);
    return [
      ...state.slice(0, userIndex - 1),
      user,
      ...state.slice(userIndex + 1),
    ];
  }

  return state;
});

// const userStore = new Store(reducer);