import { env } from "../config/env";

const Auth = () => {
  const checkLoginStatus = async () => {
    try {
      if (localStorage.getItem("token")) {
        const response = await fetch(`${env.BASE_URL}/api/users`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` || "",
          },
        });

        if (response.ok) return true;

        localStorage.removeItem("token");
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };
  return checkLoginStatus();
};

export default Auth;
