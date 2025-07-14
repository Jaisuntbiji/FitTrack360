import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import {
  Users,
  UserCheck,
  Calendar,
  CreditCard,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import axios from "axios";

interface ApiStats {
  totalMembers: number;
  activeTrainers: number;
  totalClass: number;
  monthlyRevenue: number;
}

interface DashboardOverviewProps {
  userRole: string;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ userRole }) => {
  const { members, trainers, classes, payments } = useData();
  const [apiStats, setApiStats] = useState<ApiStats | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/dashboadOverview"
        );
        setApiStats(res.data);
      } catch (error) {
        console.error("Failed to fetch dashboard overview:", error);
      }
    };

    fetchData();
  }, []);

  const getStats = () => {
    if (userRole === "admin") {
      return [
        {
          title: "Total Members",
          value: apiStats?.totalMembers,
          icon: Users,
          color: "bg-blue-500",
          change: "+12%",
        },
        {
          title: "Active Trainers",
          value: apiStats?.activeTrainers,
          icon: UserCheck,
          color: "bg-green-500",
          change: "+5%",
        },
        {
          title: "Total Classes",
          value: apiStats?.totalClass,
          icon: Calendar,
          color: "bg-purple-500",
          change: "+8%",
        },
        {
          title: "Monthly Revenue",
          value: apiStats?.monthlyRevenue,
          icon: CreditCard,
          color: "bg-orange-500",
          change: "+15%",
        },
      ];
    } else if (userRole === "trainer") {
      return [
        {
          title: "My Members",
          value: members.filter((m) => m.trainerId === "1").length,
          icon: Users,
          color: "bg-blue-500",
          change: "+3",
        },
        {
          title: "Classes Today",
          value: 4,
          icon: Calendar,
          color: "bg-green-500",
          change: "On Schedule",
        },
        {
          title: "Attendance Rate",
          value: "92%",
          icon: TrendingUp,
          color: "bg-purple-500",
          change: "+2%",
        },
        {
          title: "Next Class",
          value: "2:00 PM",
          icon: Clock,
          color: "bg-orange-500",
          change: "CrossFit",
        },
      ];
    } else {
      return [
        {
          title: "Membership Status",
          value: "Active",
          icon: CheckCircle2,
          color: "bg-green-500",
          change: "10 days left",
        },
        {
          title: "Classes Attended",
          value: 24,
          icon: Calendar,
          color: "bg-blue-500",
          change: "This month",
        },
        {
          title: "Next Payment",
          value: "$150",
          icon: CreditCard,
          color: "bg-orange-500",
          change: "Due Dec 1",
        },
        {
          title: "Fitness Goal",
          value: "75%",
          icon: TrendingUp,
          color: "bg-purple-500",
          change: "Progress",
        },
      ];
    }
  };

  const stats = getStats();

  const getRecentActivity = () => {
    if (userRole === "admin") {
      return [
        {
          type: "member",
          message: "Alice Johnson renewed annual membership",
          time: "2 hours ago",
          icon: Users,
        },
        {
          type: "payment",
          message: "Monthly payment received from Bob Smith",
          time: "4 hours ago",
          icon: CreditCard,
        },
        {
          type: "class",
          message: "New Yoga class scheduled for next week",
          time: "6 hours ago",
          icon: Calendar,
        },
        {
          type: "trainer",
          message: "Sarah Davis updated availability",
          time: "1 day ago",
          icon: UserCheck,
        },
      ];
    } else if (userRole === "trainer") {
      return [
        {
          type: "class",
          message: "CrossFit class completed - 12 attendees",
          time: "1 hour ago",
          icon: Calendar,
        },
        {
          type: "member",
          message: "New member assigned: Mike Johnson",
          time: "3 hours ago",
          icon: Users,
        },
        {
          type: "schedule",
          message: "Schedule updated for next week",
          time: "5 hours ago",
          icon: Clock,
        },
        {
          type: "achievement",
          message: "Monthly attendance goal achieved!",
          time: "1 day ago",
          icon: TrendingUp,
        },
      ];
    } else {
      return [
        {
          type: "class",
          message: "Attended Morning Yoga class",
          time: "2 hours ago",
          icon: Calendar,
        },
        {
          type: "payment",
          message: "Monthly payment processed successfully",
          time: "1 day ago",
          icon: CreditCard,
        },
        {
          type: "goal",
          message: "Fitness goal progress updated",
          time: "2 days ago",
          icon: TrendingUp,
        },
        {
          type: "class",
          message: "Booked CrossFit class for tomorrow",
          time: "3 days ago",
          icon: Calendar,
        },
      ];
    }
  };

  const recentActivity = getRecentActivity();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {userRole === "admin"
            ? "Admin Dashboard"
            : userRole === "trainer"
            ? "Trainer Dashboard"
            : "Member Dashboard"}
        </h1>
        <p className="text-gray-600 mt-2">
          {userRole === "admin"
            ? "Manage your gym operations and monitor performance."
            : userRole === "trainer"
            ? "Track your schedule, members, and classes."
            : "Monitor your fitness journey and membership details."}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <Icon className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {userRole === "admin" && (
              <>
                <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left">
                  <Users className="w-6 h-6 text-blue-600 mb-2" />
                  <p className="text-sm font-medium text-blue-900">
                    Add Member
                  </p>
                </button>
                <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left">
                  <UserCheck className="w-6 h-6 text-green-600 mb-2" />
                  <p className="text-sm font-medium text-green-900">
                    Add Trainer
                  </p>
                </button>
                <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left">
                  <Calendar className="w-6 h-6 text-purple-600 mb-2" />
                  <p className="text-sm font-medium text-purple-900">
                    Schedule Class
                  </p>
                </button>
                <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-left">
                  <CreditCard className="w-6 h-6 text-orange-600 mb-2" />
                  <p className="text-sm font-medium text-orange-900">
                    Process Payment
                  </p>
                </button>
              </>
            )}
            {userRole === "trainer" && (
              <>
                <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left">
                  <Calendar className="w-6 h-6 text-blue-600 mb-2" />
                  <p className="text-sm font-medium text-blue-900">
                    View Schedule
                  </p>
                </button>
                <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left">
                  <Users className="w-6 h-6 text-green-600 mb-2" />
                  <p className="text-sm font-medium text-green-900">
                    Check Members
                  </p>
                </button>
                <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left">
                  <CheckCircle2 className="w-6 h-6 text-purple-600 mb-2" />
                  <p className="text-sm font-medium text-purple-900">
                    Mark Attendance
                  </p>
                </button>
                <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-left">
                  <TrendingUp className="w-6 h-6 text-orange-600 mb-2" />
                  <p className="text-sm font-medium text-orange-900">
                    Update Progress
                  </p>
                </button>
              </>
            )}
            {userRole === "member" && (
              <>
                <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left">
                  <Calendar className="w-6 h-6 text-blue-600 mb-2" />
                  <p className="text-sm font-medium text-blue-900">
                    Book Class
                  </p>
                </button>
                <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left">
                  <CreditCard className="w-6 h-6 text-green-600 mb-2" />
                  <p className="text-sm font-medium text-green-900">
                    View Payments
                  </p>
                </button>
                <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left">
                  <TrendingUp className="w-6 h-6 text-purple-600 mb-2" />
                  <p className="text-sm font-medium text-purple-900">
                    Track Progress
                  </p>
                </button>
                <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-left">
                  <Users className="w-6 h-6 text-orange-600 mb-2" />
                  <p className="text-sm font-medium text-orange-900">
                    Contact Trainer
                  </p>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Alerts & Notifications */}
      {userRole === "admin" && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Alerts & Notifications
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-yellow-900">
                  3 memberships expiring this week
                </p>
                <p className="text-xs text-yellow-700">
                  Review and send renewal reminders
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm font-medium text-red-900">
                  2 overdue payments
                </p>
                <p className="text-xs text-red-700">
                  Follow up with members for payment collection
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-900">
                  Monthly target achieved
                </p>
                <p className="text-xs text-green-700">
                  Congratulations on reaching your revenue goal!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;
