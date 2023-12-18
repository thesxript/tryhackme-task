import { Navigate, Outlet } from "react-router-dom";
import Auth from "../utils/Auth";
import { useState } from "react";
import Spinner from "../components/Spinner";

export function ProtectedRoute() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  Auth()
    .then((res) => res && setIsLoggedIn(res))
    .catch(() => setIsLoggedIn(false))
    .finally(() => setIsLoading(false));

  if (isLoading) {
    return <Spinner />;
  }

  const auth = isLoggedIn ? true : false;
  return auth ? <Outlet /> : <Navigate to="/login" />;
}
export function ProtectedAuthRoute() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  Auth()
    .then((res) => res && setIsLoggedIn(res))
    .catch(() => setIsLoggedIn(false))
    .finally(() => setIsLoading(false));

  if (isLoading) {
    return <Spinner />;
  }

  const auth = isLoggedIn ? true : false;
  return auth ? <Navigate to="/tasks" /> : <Outlet />;
}
