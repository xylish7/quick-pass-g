// @flow
import { SET_VAULT, GET_VAULTS, OPEN_VAULT } from '../actions/vault';
import type { Action } from './types';
import type { VaultType } from '../actions/vault';
import updateObject from '../utils/update-object';
import { cloneDeep } from 'lodash';

export type VaultState = {
  vaults: Array<VaultType>,
  openedVaults: Array,
  selectedVault: Object
};

const defaultState: VaultState = {
  vaults: [],
  openedVaults: [],
  selectedVault: {}
};

const openVault = (state: VaultState, action: Action) => {
  // Add the recently opened vault to the openVaults array
  const clonedOpenedVaults = cloneDeep(state.openedVaults);
  clonedOpenedVaults.push({ [action.vaultId]: action.vault });

  return updateObject(state, {
    openedVaults: clonedOpenedVaults,
    selectedVault: {
      id: action.vaultId,
      vault: action.vault
    }
  });
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
    case OPEN_VAULT:
      return openVault(state, action);
    default:
      return state;
  }
}
