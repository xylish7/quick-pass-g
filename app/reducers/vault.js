// @flow
import { SET_VAULT, GET_VAULTS } from '../actions/vault';
import type { Action } from './types';
import type { Vault } from '../actions/vault';
import updateObject from '../utils/update-object';

export type VaultState = {
  vaults: Array<Vault>
};

const defaultState: VaultState = {
  vaults: []
};

export default function counter(
  state: MenuState = defaultState,
  action: Action
) {
  switch (action.type) {
    case GET_VAULTS:
      return updateObject(state, { vaults: action.vaults });
    case SET_VAULT:
      return updateObject(state, { vaults: action.vaults });
    default:
      return state;
  }
}
