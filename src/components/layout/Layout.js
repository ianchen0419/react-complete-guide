import { Fragment } from 'react';

import MainNavigation from './MainNavigation';

function Layout(props) {
  return (
    <>
      <MainNavigation />
      <main>{props.children}</main>
    </>
  );
}

export default Layout;
