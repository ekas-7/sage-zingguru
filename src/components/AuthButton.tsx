import { useAuth } from "../context/AuthProvider";

export const AuthButton = () => {
  const { user, login, logout } = useAuth();
  return user ? (
    <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={logout}>Logout</button>
  ) : (
    <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={login}>Login with Google</button>
  );
};
