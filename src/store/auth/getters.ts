import type { IState } from "./state";

export default {
  user(state: IState) {
    return state.user;
  },
  token(state: IState) {
    return state.token;
  },
}
