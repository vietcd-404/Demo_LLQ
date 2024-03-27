import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { APP_BASE_URL } from "../../config/constans";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();
  let sessionTimer;

  const signin = async (username, password) => {
    try {
      const response = await fetch(`${APP_BASE_URL}api/auth/signin`, {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 401) {
        const data = await response.json();
        return;
      }

      const data = await response.json();

      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      Swal.fire({
        title: "Đăng nhập!",
        text: "Đăng nhập thành công",
        icon: "success",
      });
      if (data.role === "ROLE_ADMIN") {
        navigate("/", {
          replace: true,
        });
      } else if (data.role === "ROLE_USER") {
        navigate("/", {
          replace: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signup = async (username, password, email, sdt) => {
    try {
      const response = await fetch(`${APP_BASE_URL}api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(username, password, email, sdt),
      });

      if (response.ok) {
        // Đăng ký thành công, thực hiện chuyển hướng hoặc hiển thị thông báo
      } else {
        // Xử lý lỗi đăng ký không thành công
        const data = await response.json();
        console.error("Đăng ký thất bại:", data.message);
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu đăng ký:", error);
    }
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/signin", {
      replace: true,
    });
  };

  const value = useMemo(
    () => ({
      user,
      signin,
      signout,
      signup,
    }),
    [user]
  );

  useEffect(() => {
    if (user) {
    }
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
