import React from "react";
import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/use-auth";

export function LoginRoute() {
  const [password, setPassword] = useState('');
  const [wrongPassword, setWrongPassword] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();

  const from = (location.state as any)?.from?.pathname || "/";

  const handleLogin = useCallback<React.FormEventHandler<HTMLFormElement>>(async (e) => {
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
    } catch(e) {
      setWrongPassword(true);
    }
  }, [auth, from, navigate, password]);

  return (
    <form onSubmit={handleLogin}>
      {wrongPassword && <div>Wrong Password</div>}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='submit'>Login</button>
    </form>
  );
}
