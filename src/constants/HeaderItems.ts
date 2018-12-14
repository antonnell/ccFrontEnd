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
}

const HeaderItems: HeaderItemsInterface = {
  pooling: {
    buttons: [{
      label: "New Pool",
      link: "createPool"
    }],
    menuItems: [
      {
        label: "Browse Pools",
        link: "browsePools"
      },
      {
        label: "My Invites",
        link: "myInvites"
      }
    ]
  },
  poolCreate: {
    buttons: [{
      label: "Pool Home",
      link: "pooling"
    }],
    menuItems: [
      {
        label: "Browse Pools",
        link: "browsePools"
      },
      {
        label: "My Invites",
        link: "myInvites"
      }
    ]
  }
};

export default HeaderItems;
