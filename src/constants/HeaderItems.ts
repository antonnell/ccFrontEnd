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
  poolCreate: HeaderItem;
  poolBrowse: HeaderItem;
}

const poolingMenuItems = [
  {
    label: "Browse Pools",
    link: "browsePools"
  },
  {
    label: "Create Whitelist",
    link: "createWhitelist"
  }
];

const poolingBrowseMenuItems = [
  {
    label: "New Pool",
    link: "createPool"
  },
  {
    label: "Create Whitelist",
    link: "createWhitelist"
  }
];

const headerItems: HeaderItemsInterface = {
  pooling: {
    buttons: [{
      label: "New Pool",
      link: "createPool"
    }],
    menuItems: poolingMenuItems
  },
  poolCreate: {
    buttons: [{
      label: "Pool Home",
      link: "pooling"
    }],
    menuItems: poolingMenuItems
  },
  poolBrowse: {
    buttons: [{
      label: "Pool Home",
      link: "pooling"
    }],
    menuItems: poolingBrowseMenuItems
  }
};

export default headerItems;
