// @flow
import {
  SET_VAULT,
  GET_VAULTS,
  OPEN_VAULT,
  CREATE_GROUP
} from '../actions/vault';
import type { Action } from './types';
import type { VaultType } from '../actions/vault';
import updateObject from '../utils/update-object';
import { cloneDeep } from 'lodash';
import * as vaultController from '../utils/vault-controller';

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

  // Add password to vaults
  const clonedVaults = cloneDeep(state.vaults);
  clonedVaults.forEach(vault => {
    if (vault.id === action.vaultId) vault.password = action.password;
  });

  return updateObject(state, {
    vaults: clonedVaults,
    openedVaults: clonedOpenedVaults,
    selectedVault: {
      id: action.vaultId,
      vault: action.vault
    }
  });
};

const createGroup = (state: VaultState, action: Action) => {
  const clonedSelectedVault = cloneDeep(state.selectedVault);

  clonedSelectedVault.vault.createGroup(action.groupName);

  vaultController.createGroup(state.vaults, clonedSelectedVault);

  return updateObject(state, {
    selectedVault: clonedSelectedVault
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
    case CREATE_GROUP:
      return createGroup(state, action);
    default:
      return state;
  }
}
