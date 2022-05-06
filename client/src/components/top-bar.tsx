import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useAuth } from "../auth/use-auth";

export function TopBar() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    auth.logout();
    navigate('/logout');  
  }, [auth, navigate]);

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Потребителска кошница
        </Typography>
        {auth.authenticated && <Button color="inherit" onClick={handleLogout}>Изход</Button>}
      </Toolbar>
    </AppBar>
  );
}
