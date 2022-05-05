import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/use-auth";

export function MainNav() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    auth.logout();
    navigate('/logout');  
  }, [auth, navigate]);

  return <nav>
    {
      auth.authenticated ? <div>
        Logged In
        <button onClick={handleLogout}>Log out</button>
      </div> : null
    }
  </nav>;
}
