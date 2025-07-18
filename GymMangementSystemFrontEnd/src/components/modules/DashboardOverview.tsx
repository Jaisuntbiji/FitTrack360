import React, { useEffect, useState } from "react";
import { Member, useData } from "../../contexts/DataContext";
import { useAuth } from "../../contexts/AuthContext";
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
  // const { members, trainers, classes, payments } = useData();
  const [apiStats, setApiStats] = useState<ApiStats | null>(null);

  const { user } = useAuth();
  const [memberData, setMemberData] = useState<Member | null>(null);
  const [daysBetween, setDaysBetween] = useState(0);
  const [expiredMember, setexpiredMember] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user || !user.userEmail) return;

      if (userRole === "admin") {
        try {
          const res = await axios.get(
            "http://localhost:8080/api/dashboadOverview"
          );

          const warning = await axios.get(
            "http://localhost:8080/api/checkExpiedMember"
          );
          setexpiredMember(warning.data);
          setApiStats(res.data);
        } catch (error) {
          console.error("Failed to fetch dashboard overview:", error);
        }
      }

      if (userRole === "member") {
        try {
          const res = await axios.get(
            `http://localhost:8080/api/getMemberByEmail/${user.userEmail}`
          );
          const member = res.data;

          // Calculate days left from membershipEndDate
          if (member?.membershipEndDate) {
            const today = new Date();
            const endDate = new Date(member.membershipEndDate);
            const timeDiff = endDate.getTime() - today.getTime();
            const daysLeft = Math.max(
              Math.ceil(timeDiff / (1000 * 60 * 60 * 24)),
              0
            );
            setDaysBetween(daysLeft); // Append this to the fetched object
          }

          setMemberData(member);
        } catch (error) {
          console.error("Failed to fetch member data by email:", error);
        }
      }
    };

    fetchDashboardData();
  }, [userRole, user]);
  const getStats = () => {
    if (userRole === "admin") {
      return [
        {
          title: "Total Members",
          value: apiStats?.totalMembers,
          icon: Users,
          color: "bg-blue-500",
          change: null,
        },
        {
          title: "Active Trainers",
          value: apiStats?.activeTrainers,
          icon: UserCheck,
          color: "bg-green-500",
          change: null,
        },
        {
          title: "Expired Members",
          value: expiredMember,
          icon: Calendar,
          color: "bg-purple-500",
          change: "",
        },
        {
          title: "Monthly Revenue",
          value: apiStats?.monthlyRevenue,
          icon: CreditCard,
          color: "bg-orange-500",
          change: null,
        },
      ];
    } else if (userRole === "trainer") {
      return [
        {
          title: "My Members",
          value: "",
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
          value: memberData?.status || "Loading...",
          icon: CheckCircle2,
          color: "bg-green-500",
          change: `${daysBetween} days left`,
        },
        // {
        //   title: "Classes Attended",
        //   value: memberData?.classesAttended || 0,
        //   icon: Calendar,
        //   color: "bg-blue-500",
        //   change: "This month",
        // },
        // {
        //   title: "Next Payment",
        //   value: memberData?.nextPaymentAmount
        //     ? `$${memberData.nextPaymentAmount}`
        //     : "$0",
        //   icon: CreditCard,
        //   color: "bg-orange-500",
        //   change: memberData?.nextPaymentDue
        //     ? `Due ${new Date(memberData.nextPaymentDue).toLocaleDateString()}`
        //     : "Due soon",
        // },
        // {
        //   title: "Fitness Goal",
        //   value: memberData?.fitnessProgress
        //     ? `${memberData.fitnessProgress}%`
        //     : "0%",
        //   icon: TrendingUp,
        //   color: "bg-purple-500",
        //   change: "Progress",
        // },
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

      {/* Alerts & Notifications */}
      {userRole === "admin" && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Alerts & Notifications
          </h3>
          <div className="space-y-3">
            {expiredMember !== 0 && (
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-yellow-900">
                    {expiredMember} memberships expiring this week
                  </p>
                  <p className="text-xs text-yellow-700">
                    Review and send renewal reminders
                  </p>
                </div>
              </div>
            )}

            {/* <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
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
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;
