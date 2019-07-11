interface HeaderButtons {
  label: string;
  link: string;
}

export interface HeaderItem {
  buttons: HeaderButtons[],
  menuItems: HeaderButtons[]
}

interface HeaderItemsInterface {
  pooling: HeaderItem;
  createPool: HeaderItem;
  poolBrowse: HeaderItem;
  createWhitelist: HeaderItem;
}

const poolHomeMenuItem = {
  label: "Pool Home",
    link: "browsePools"
};

const createPoolMenuItem = {
  label: "Create Pool",
  link: "createPool"
};

const createWhitelistMenuItem = {
  label: "Create Whitelist",
  link: "createWhitelist"
};
const poolManagementMenuItem = {
  label: "Pool Management",
  link: "pooling"
};

const headerItems: HeaderItemsInterface = {
  pooling: {
    buttons: [poolHomeMenuItem],
    menuItems: [
      createPoolMenuItem,
      createWhitelistMenuItem
    ]
  },
  createPool: {
    buttons: [poolHomeMenuItem],
    menuItems: [
      poolManagementMenuItem,
      createWhitelistMenuItem
    ]
  },
  poolBrowse: {
    buttons: [createPoolMenuItem],
    menuItems: [
      poolManagementMenuItem,
      createWhitelistMenuItem
    ]
  },
  createWhitelist: {
    buttons: [poolHomeMenuItem],
    menuItems: [
      poolManagementMenuItem,
      createPoolMenuItem,
    ]
  }
};

export default headerItems;
