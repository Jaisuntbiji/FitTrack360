import React from 'react';
import DashboardOverview from '../modules/DashboardOverview';
import TrainerSchedule from '../modules/TrainerSchedule';
import TrainerMembers from '../modules/TrainerMembers';
import AttendanceManagement from '../modules/AttendanceManagement';

interface TrainerDashboardProps {
  activeModule: string;
}

const TrainerDashboard: React.FC<TrainerDashboardProps> = ({ activeModule }) => {
  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardOverview userRole="trainer" />;
      case 'schedule':
        return <TrainerSchedule />;
      case 'members':
        return <TrainerMembers />;
      case 'attendance':
        return <AttendanceManagement />;
      default:
        return <DashboardOverview userRole="trainer" />;
    }
  };

  return (
    <div className="space-y-6">
      {renderModule()}
    </div>
  );
};

export default TrainerDashboard;