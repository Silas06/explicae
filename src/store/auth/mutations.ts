export default {
  SET_USER(state: any, user: any) {
    state.user = user;
  },
  SET_TOKEN(state: any, token: string) {
    state.token = token;
  },
  LOGOUT(state: any) {
    state.user = null;
    state.token = null;
  },
  SET_LOADING(state: any, loading: boolean) {
    state.loading = loading;
  },
}
