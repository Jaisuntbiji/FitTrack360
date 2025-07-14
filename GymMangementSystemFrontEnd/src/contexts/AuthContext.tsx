import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";
export interface User {
  userId: number;
  userName: string;
  userPassword: string;
  userEmail: string;
  userRole: "admin" | "trainer" | "member"; // ✅ Add this line
  userAvatar: string; // optional: if you're using it
}

// export interface User {
//   id: string;
//   name: string;
//   email: string;
//   userRole: "admin" | "trainer" | "member";
//   avatar?: string;
// }

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Mock users for demo
  // const mockUsers: User[] = [
  //   { id: "1", name: "Admin User", email: "admin@gym.com", role: "admin" },
  //   {
  //     id: "2",
  //     name: "John Trainer",
  //     email: "trainer@gym.com",
  //     role: "trainer",
  //   },
  //   { id: "3", name: "Jane Member", email: "member@gym.com", role: "member" },
  // ];

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);

    const respones = axios.post("http://localhost:8080/api/login", {
      userEmail: email,
      password: password,
    });

    console.log((await respones).status);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if ((await respones).status == 200) {
      const foundUser = (await respones).data;
      setUser(foundUser);
      setLoading(false);
      return true;
    }

    // // // Simulate API call

    // const foundUser = mockUsers.find((u) => u.email === email);
    // if (foundUser && password === "password") {
    //   setUser(foundUser);
    //   setLoading(false);
    //   return true;
    // }

    setLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
