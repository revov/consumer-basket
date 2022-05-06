import { Box, Toolbar } from '@mui/material';

import { TopBar } from './top-bar';
import { SideMenu } from './side-menu';
import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <TopBar />
      <SideMenu />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        <Outlet />
      </Box>
    </Box>
  );
}
