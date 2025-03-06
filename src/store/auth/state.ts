import type { IUser } from '@/types/user'
export interface IState {
  user: IUser | null
  token: string | null
  loading: boolean
}

export default {
  user: null,
  token: null,
  loading: false,
} as IState
