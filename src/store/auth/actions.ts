/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import sleep from '@/utils/sleep';
import { AuthActionTypes } from './mutationsTypes';
import { userMock } from '@/data/user';

export default {
  async login({ commit }: { commit: Function }, payload: { email: string, password: string }) {
    try {
      commit(AuthActionTypes.SET_LOADING, true);
      console.log("payload", payload);
      // Simula um delay como se fosse uma API
      await sleep(1500)

      // Usa os dados mockados diretamente
      commit(AuthActionTypes.SET_USER, userMock.user);
      commit(AuthActionTypes.SET_TOKEN, userMock.token);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      commit(AuthActionTypes.SET_LOADING, false);
    }
  },
  async logout({ commit }: { commit: Function }) {
    console.log('logout');
    commit(AuthActionTypes.LOGOUT);
  },
  async register() {
    console.log('register');
  }
}
