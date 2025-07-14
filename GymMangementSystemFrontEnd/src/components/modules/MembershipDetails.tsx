import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useData } from "../../contexts/DataContext";
import {
  Calendar,
  CreditCard,
  User,
  Award,
  Clock,
  CheckCircle,
} from "lucide-react";

const MembershipDetails: React.FC = () => {
  const { user } = useAuth();
  const { members } = useData();

  // Mock member data - in a real app, this would be based on the logged-in user
  const memberData = {
    id: "3",
    name: "Jane Member",
    email: "member@gym.com",
    phone: "+1234567894",
    membershipType: "Premium Monthly",
    startDate: "2024-11-01",
    expiryDate: "2024-12-01",
    status: "active",
    trainerId: "2",
    membershipHistory: [
      {
        date: "2024-11-01",
        type: "Premium Monthly",
        amount: 80,
        status: "active",
      },
      {
        date: "2024-10-01",
        type: "Basic Monthly",
        amount: 50,
        status: "expired",
      },
    ],
    fitnessGoals: [
      { goal: "Lose 10 lbs", progress: 60, target: "2024-12-31" },
      { goal: "Attend 20 classes/month", progress: 75, target: "2024-12-31" },
      { goal: "Improve flexibility", progress: 40, target: "2024-12-31" },
    ],
  };

  const daysUntilExpiry = Math.ceil(
    (new Date(memberData.expiryDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Membership</h1>
        <p className="text-gray-600 mt-2">
          View and manage your membership details
        </p>
      </div>

      {/* Membership Status Card */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Current Membership</h3>
            <p className="text-2xl font-bold">{memberData.membershipType}</p>
            <div className="flex items-center space-x-4 mt-3 text-blue-100">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Started: {memberData.startDate}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>Expires: {memberData.expiryDate}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-2">
              <CheckCircle className="w-8 h-8" />
            </div>
            <p className="text-blue-100">Status</p>
            <p className="text-xl font-bold capitalize">{memberData.status}</p>
          </div>
        </div>

        {daysUntilExpiry <= 7 && (
          <div className="mt-4 p-3 bg-white bg-opacity-20 rounded-lg">
            <p className="text-sm">
              ⚠️ Your membership expires in {daysUntilExpiry} day
              {daysUntilExpiry !== 1 ? "s" : ""}.
              <button className="ml-2 underline hover:no-underline">
                Renew now
              </button>
            </p>
          </div>
        )}
      </div>

      {/* Member Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Personal Information
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-medium text-gray-900">{memberData.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CreditCard className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-900">{memberData.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium text-gray-900">{memberData.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Award className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Assigned Trainer</p>
                <p className="font-medium text-gray-900">Sarah Davis</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Membership Benefits
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Unlimited gym access</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">All group classes included</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">
                Personal trainer sessions (2/month)
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Locker room access</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Nutrition consultation</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Mobile app access</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fitness Goals */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Fitness Goals
        </h3>
        <div className="space-y-4">
          {memberData.fitnessGoals.map((goal, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">{goal.goal}</h4>
                <span className="text-sm font-medium text-blue-600">
                  {goal.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">Target: {goal.target}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Membership History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Membership History
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Membership Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {memberData.membershipHistory.map((history, index) => (
                <tr key={index}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {history.date}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {history.type}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${history.amount}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        history.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {history.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <CreditCard className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Renew Membership</h3>
          <p className="text-sm text-gray-600">
            Extend your current membership
          </p>
        </button>

        <button className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Award className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Upgrade Plan</h3>
          <p className="text-sm text-gray-600">
            Get more benefits and features
          </p>
        </button>

        <button className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <User className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Update Profile</h3>
          <p className="text-sm text-gray-600">
            Modify your personal information
          </p>
        </button>
      </div>
    </div>
  );
};

export default MembershipDetails;
