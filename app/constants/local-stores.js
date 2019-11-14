export const USER_PREFERENCES = {
  store: {
    configName: 'user-preferences',
    defaults: {
      themeMode: 'light',
      themeColor: 'primary'
    }
  },
  values: {
    themeMode: 'themeMode',
    themeColor: 'themeColor'
  }
};

export const USER_VAULTS = {
  store: {
    configName: 'user-vaults',
    defaults: {
      pathsToVaults: []
    }
  },
  values: {
    pathsToVaults: 'pathsToVaults'
  }
};
