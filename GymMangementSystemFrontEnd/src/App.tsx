import React, { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
import LoginForm from "./components/auth/LoginForm";
import AdminDashboard from "./components/dashboards/AdminDashboard";
import TrainerDashboard from "./components/dashboards/TrainerDashboard";
import MemberDashboard from "./components/dashboards/MemberDashboard";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";

function AppContent() {
  const { user, logout } = useAuth();
  const [activeModule, setActiveModule] = useState("dashboard");

  if (!user) {
    return <LoginForm />;
  }

  const renderDashboard = () => {
    switch (user.userRole) {
      case "admin":
        return <AdminDashboard activeModule={activeModule} />;
      case "trainer":
        return <TrainerDashboard activeModule={activeModule} />;
      case "member":
        return <MemberDashboard activeModule={activeModule} />;
      default:
        return <AdminDashboard activeModule={activeModule} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        userRole={user.userRole}
        activeModule={activeModule}
        setActiveModule={setActiveModule}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} onLogout={logout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {renderDashboard()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
