import { Link, Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-screen-2xl w-full flex flex-col sm:flex-row justify-center sm:justify-start px-4 sm:px-6">
          <Link
            to={"/tasks"}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3.5 me-2 mb-2 focus:outline-none flex-1 sm:flex-none text-center"
          >
            View Tasks
          </Link>

          <Link
            to={"/tasks/create"}
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-3.5 me-2 mb-2 flex-1 sm:flex-none text-center"
          >
            Create Task
          </Link>
        </div>
        <div className="py-10 mx-auto max-w-screen-2xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
