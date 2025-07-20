import React from "react";
import DashboardOverview from "../modules/DashboardOverview";
import MemberManagement from "../modules/MemberManagement";
import TrainerManagement from "../modules/TrainerManagement";
// import ClassManagement from "../modules/ClassManagement";
import PaymentManagement from "../modules/PaymentManagement";
// import AttendanceManagement from "../modules/AttendanceManagement";
// import ReportsManagement from "../modules/ReportsManagement";
import SettingsManagement from "../modules/SettingsManagement";

interface AdminDashboardProps {
  activeModule: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ activeModule }) => {
  const renderModule = () => {
    switch (activeModule) {
      case "dashboard":
        return <DashboardOverview userRole="admin" />;
      case "members":
        return <MemberManagement />;
      case "trainers":
        return <TrainerManagement />;
      case "payments":
        return <PaymentManagement />;
      case "settings":
        return <SettingsManagement />;
      default:
        return <DashboardOverview userRole="admin" />;
    }
  };

  return <div className="space-y-6">{renderModule()}</div>;
};

export default AdminDashboard;
