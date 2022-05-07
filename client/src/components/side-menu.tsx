import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import { matchPath, Link, useLocation } from 'react-router-dom';
import { Divider, ListItemButton } from '@mui/material';

const drawerWidth = 240;

export function SideMenu() {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItemButton component={Link} to="/products" selected={!!matchPath(location.pathname, '/products')} key={'Products'} >
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary={'Продукти'} />
          </ListItemButton>
          <ListItem button component={Link} to="/categories" selected={!!matchPath(location.pathname, '/categories')} key={'Categories'}>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary={'Категории'} />
          </ListItem>
          <Divider />
        </List>
      </Box>
    </Drawer>
  );
}
