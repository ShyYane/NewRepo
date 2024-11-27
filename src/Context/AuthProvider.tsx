import { useEffect } from "react";
import { getRoleFromToken } from "../Services/AuthService";

function AuthProvider() {
  //   const [auth, setAuth] = useState({});
  const fetchUser = async () => {
    try {
      const response = await getRoleFromToken();
      console.log(response.result.roles);
      //   setAuth({ user: response.result.roles });
    } catch (e) {}
  };
  useEffect(() => {
    fetchUser();
  }, []);
}

export default AuthProvider;
