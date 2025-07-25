import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { Calendar, AlertCircle, Clock, CheckCircle } from "lucide-react";

interface FitnessGoal {
  goal: string;
  progress: number;
  target: string;
}

interface MembershipHistoryEntry {
  date: string;
  type: string;
  amount: number;
  status: string;
}

interface MemberData {
  memberId: number;
  memberName: string;
  memberEmail: string;
  memberPhoneNo: string;
  memberShipType: string;
  startDate: string;
  expiryDate: string;
  status: "active" | "expired" | "suspended";
  trainerId: number | null;
  membershipHistory: MembershipHistoryEntry[];
  fitnessGoals: FitnessGoal[];
}

const MembershipDetails: React.FC = () => {
  const { user } = useAuth();
  const [memberData, setMemberData] = useState<MemberData | null>(null);
  const [daysUntilExpiry, setDaysUntilExpiry] = useState<number>(0);

  useEffect(() => {
    const fetchMemberData = async () => {
      if (!user || !user.userEmail) return;

      try {
        const res = await axios.get(
          `http://localhost:8080/api/getMemberByEmail/${user.userEmail}`
        );
        const data: MemberData = res.data;
        console.log(data.memberName);
        setMemberData(data);

        if (data.expiryDate) {
          const expiryDateOnly = new Date(data.expiryDate)
            .toISOString()
            .split("T")[0];
          console.log("Expiry Date (only date):", expiryDateOnly);

          const expiry = new Date(data.expiryDate).getTime();
          const now = new Date().getTime();
          const diffDays = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
          setDaysUntilExpiry(diffDays);
        }
      } catch (error) {
        console.error("Error fetching member data:", error);
      }
    };

    fetchMemberData();
  }, [user]);

  const formatDate = (date: String) => {
    const dataOnly = date.split("T");
    const [year, month, day] = dataOnly[0].split("-");
    return `${day}-${month}-${year}`; // Convert to DD-MM-YYYY
  };

  if (!memberData) {
    return <p className="text-gray-600">Loading membership details...</p>;
  }

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
            <h3 className="text-lg font-semibold mb-2">
              {memberData.memberName}
            </h3>
            <p className="text-2xl font-bold">{memberData.memberShipType}</p>
            <div className="flex items-center space-x-4 mt-3 text-blue-100">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Started: {formatDate(memberData.startDate)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>Expires: {formatDate(memberData.expiryDate)}</span>
              </div>
            </div>
          </div>
          {/* <div className="text-right">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-2">
              <CheckCircle className="w-8 h-8" />
            </div>
            <p className="text-blue-100">Status</p>
            <p className="text-xl font-bold capitalize">{memberData.status}</p>
          </div> */}
          <div className="text-right">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
                memberData.status === "expired"
                  ? "bg-red-600 bg-opacity-80"
                  : "bg-green-500 bg-opacity-20"
              }`}
            >
              {memberData.status === "expired" ? (
                <AlertCircle className="w-8 h-8 text-white" />
              ) : (
                <CheckCircle className="w-8 h-8 text-white" />
              )}
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
    </div>
  );
};

export default MembershipDetails;
