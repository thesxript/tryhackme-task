import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const LogoutButton = () => {
    const handleLogout = () => {
      localStorage.removeItem("token");

      navigate("/");
    };

    return (
      <button
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2"
        onClick={handleLogout}
      >
        Logout
      </button>
    );
  };

  return (
    <header>
      <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Welcome!
            </h1>

            <p className="mt-1.5 text-sm text-gray-500">
              Let's create and view your tasks!
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  );
}
