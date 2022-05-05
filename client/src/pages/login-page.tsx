import { useState } from "react";
import { useLoginMutation } from "../queries/login";

export function LoginPage() {
  const [password, setPassword] = useState('');
  const loginMutation = useLoginMutation();

  return (
    <div>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => loginMutation.mutate({password})}>Login</button>
    </div>
  );
}
