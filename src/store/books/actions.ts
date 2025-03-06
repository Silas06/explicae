/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import sleep from '@/utils/sleep';
import { AuthActionTypes } from './mutationsTypes';
import { books } from '@/data/books';

export default {
  async getBooks({ commit }: { commit: Function }) {
    try {
      commit(AuthActionTypes.SET_LOADING, true);
      // Simula um delay como se fosse uma API
      await sleep(1500)

      // Usa os dados mockados diretamente
      commit(AuthActionTypes.SET_BOOKS, books);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      commit(AuthActionTypes.SET_LOADING, false);
    }
  },
}
