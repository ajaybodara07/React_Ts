// No Lnger Used. Delete going ahead

import React, { useState } from 'react';

import LeftTreeList from './LeftTreeList';

interface ILeftDrawerProps {
  classes: any;
  selected: Function;
  open: boolean;
  client: any;
  user: any;
}

const LeftDrawer: React.FC<ILeftDrawerProps> = ({
  open,
  selected,
  client,
  user
}) => {
  return (
    <LeftTreeList
      user={user}
      client={client}
      open={open}
      selected={selected}
      setActiveConversation={() => {}}
    />
  );
};
export default LeftDrawer;
