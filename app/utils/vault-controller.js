import { Datasources, Credentials } from 'buttercup';

/**
 * Create a new group for the given [selectedVault]
 *
 * @param {Array} vaults
 * @param {Object} selectedVault
 */
const createGroup = (vaults, selectedVault) => {
  vaults.forEach(vault => {
    if (vault.id === selectedVault.id) {
      const { FileDatasource } = Datasources;
      const fileDatasource = new FileDatasource(vault.path);

      const credentials = Credentials.fromPassword(vault.password);
      fileDatasource.save(selectedVault.vault.getHistory(), credentials);
    }
  });
};

export { createGroup };
