// @flow
import fs from 'fs';
import type { Dispatch } from '../reducers/types';
import { USER_VAULTS } from '../constants/local-stores';
import LocalStore from '../utils/local-store';
import uuidv4 from 'uuid/v4';
import { dispatch } from 'rxjs/internal/observable/pairs';

export const SET_VAULT = 'SET_VAULT';
export const GET_VAULTS = 'GET_VAULTS';
export const OPEN_VAULT = 'OPEN_VAULT';
export const CREATE_GROUP = 'CREATE_GROUP';

export type VaultType = {
  name: string,
  path: string,
  id: String
};

/**
 * Set the path to the vault
 *
 * @param {String} vaultPath
 */
export const setVault = (vaultPath: string) => (dispatch: Dispatch): void => {
  const userVaultsStore = new LocalStore(USER_VAULTS.store);

  // Get already stored vaults
  const vaults: Array<Vault> = userVaultsStore.get(USER_VAULTS.values.vaults);

  // Add vault only if it's not already added
  if (vaults.filter(vault => vault.path === vaultPath).length === 0) {
    // Create vault object
    const newVault: Vault = {
      name: vaultPath.slice(vaultPath.lastIndexOf('\\') + 1, vaultPath.length),
      path: vaultPath,
      id: uuidv4()
    };

    vaults.push(newVault);

    // Save the vault to the store
    userVaultsStore.set(USER_VAULTS.values.vaults, vaults);

    dispatch({
      type: SET_VAULT,
      vaults
    });
  }
};

/**
 * Get the vaults details
 *
 */
export const getVaults = () => (dispatch: Dispatch): void => {
  const userVaultsStore = new LocalStore(USER_VAULTS.store);

  // Get already stored vaults details
  const vaults = userVaultsStore.get(USER_VAULTS.values.vaults);

  // Remove vaults wich were moved/deleted by the user
  const filteredVaults: Array<Vault> = vaults.filter((vault: Vault) => {
    if (fs.existsSync(vault.path)) return vault;
  });

  // Save the filtered vaults
  userVaultsStore.set(USER_VAULTS.values.vaults, filteredVaults);

  dispatch({
    type: GET_VAULTS,
    vaults: filteredVaults
  });
};

/**
 * Open a vault
 */
export const openVault = (vault, vaultId: string, password: string) => (
  dispatch: Dispatch
): void => {
  dispatch({
    type: OPEN_VAULT,
    vault,
    vaultId,
    password
  });
};

export const createGroup = (groupName: string) => (
  dispatch: Dispatch
): void => {
  dispatch({
    type: CREATE_GROUP,
    groupName
  });
};
