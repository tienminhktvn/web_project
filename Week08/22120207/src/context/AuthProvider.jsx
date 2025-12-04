import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import { CreateUser, GetUserByUsername } from "@/api/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (userData) => {
    const [response] = await GetUserByUsername(userData.username);
    if (response && response.password === userData.password) {
      setUser(response);

      toast.success("Đăng nhập thành công!", {
        description: "Chào mừng bạn quay trở lại.",
        action: {
          label: "Tắt thông báo",
        },
      });
      navigate("products");
    } else {
      toast.error("Đăng nhập thất bại!", {
        description: "Tên đăng nhập hoặc mật khẩu sai.",
        action: {
          label: "Tắt thông báo",
        },
      });
    }
  };

  const register = async (userData) => {
    try {
      const [response] = await CreateUser(userData);
      if (response) {
        setUser(response);

        toast.success("Đăng ký thành công!", {
          description: "Chào mừng bạn đến với MyShop.",
          action: {
            label: "Tắt thông báo",
          },
        });
      }
      navigate("products");
    } catch (error) {
      console.log(error);

      toast.error("Đăng Ký thất bại!", {
        description: "Tên đăng nhập hoặc email đã được đăng ký.",
        action: {
          label: "Tắt thông báo",
        },
      });
    }
  };

  const logout = () => {
    setUser(null);
    navigate("login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
