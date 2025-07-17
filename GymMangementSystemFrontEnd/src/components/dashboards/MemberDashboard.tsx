import React from "react";
import DashboardOverview from "../modules/DashboardOverview";
import MembershipDetails from "../modules/MembershipDetails";
import MemberPayments from "../modules/MemberPayments";

interface MemberDashboardProps {
  activeModule: string;
}

const MemberDashboard: React.FC<MemberDashboardProps> = ({ activeModule }) => {
  const renderModule = () => {
    switch (activeModule) {
      case "dashboard":
        return <DashboardOverview userRole="member" />;
      case "membership":
        return <MembershipDetails />;
      case "payments":
        return <MemberPayments />;
      default:
        return <DashboardOverview userRole="member" />;
    }
  };

  return <div className="space-y-6">{renderModule()}</div>;
};

export default MemberDashboard;
