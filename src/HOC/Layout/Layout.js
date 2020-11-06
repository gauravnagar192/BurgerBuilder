import React, { useState } from 'react';
import Aux from '../../HOC/Auxilary/Auxilary';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.css';

const Layout = (props) => {

  let [ showSideDrawer , setSideDrawer ] = useState(true);

  function sideDrawerCloseHandler() {
    setSideDrawer(false);
  }

  function sideDrawerToggleHandler() {
    setSideDrawer(!showSideDrawer);
  }


  return (
    <Aux>
      <Toolbar DrawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer open={showSideDrawer} close={sideDrawerCloseHandler} />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

export default Layout;
