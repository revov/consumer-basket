import React from 'react';
import { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useAuth } from '../auth/use-auth';

export function LoginRoute() {
  const [password, setPassword] = useState('');
  const [wrongPassword, setWrongPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();

  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    async (e) => {
      e.preventDefault();

      try {
        await auth.login(password);
        // Send them back to the page they tried to visit when they were
        // redirected to the login page. Use { replace: true } so we don't create
        // another entry in the history stack for the login page.  This means that
        // when they get to the protected page and click the back button, they
        // won't end up back on the login page, which is also really nice for the
        // user experience.
        navigate(from, { replace: true });
      } catch (e) {
        setWrongPassword(true);
      }
    },
    [auth, from, navigate, password],
  );

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Добре дошли!
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!wrongPassword}
            helperText={wrongPassword && 'Грешна парола'}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Парола"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Вписване
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
