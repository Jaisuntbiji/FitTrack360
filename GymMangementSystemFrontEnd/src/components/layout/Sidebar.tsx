import React from "react";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  CreditCard,
  BarChart3,
  Settings,
  Dumbbell,
} from "lucide-react";

interface SidebarProps {
  userRole: string;
  activeModule: string;
  setActiveModule: (module: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  userRole,
  activeModule,
  setActiveModule,
}) => {
  const getMenuItems = () => {
    if (userRole === "admin") {
      return [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "members", label: "Members", icon: Users },
        { id: "trainers", label: "Trainers", icon: UserCheck },
        { id: "payments", label: "Payments", icon: CreditCard },
        { id: "settings", label: "Settings", icon: Settings },
      ];
    } else if (userRole === "trainer") {
      return [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "schedule", label: "My Schedule", icon: Calendar },
        { id: "members", label: "My Members", icon: Users },
        { id: "attendance", label: "Attendance", icon: BarChart3 },
      ];
    } else {
      return [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "membership", label: "Membership", icon: Users },
        { id: "payments", label: "Payments", icon: CreditCard },
      ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="bg-white shadow-lg w-64 min-h-screen">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
            <Dumbbell className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">FitHub</h1>
            <p className="text-xs text-gray-500 capitalize">{userRole} Panel</p>
          </div>
        </div>
      </div>

      <nav className="mt-6">
        <div className="px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
