import { Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import Layout from "../components/Layout";
import TaskList from "../pages/Tasks/TaskList";
import PageNotFound from "../pages/PageNotFound";
import TaskCreate from "../pages/Tasks/TaskCreate";
import { ProtectedAuthRoute, ProtectedRoute } from "./ProtectedRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedAuthRoute />}>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/create" element={<TaskCreate />} />
        </Route>
      </Route>

      {/* Invalid Routes */}
      <Route path={"*"} element={<PageNotFound />} />
    </Routes>
  );
}
