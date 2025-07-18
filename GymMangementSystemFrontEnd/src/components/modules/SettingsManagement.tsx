import axios from "axios";
import React, { useState, useEffect } from "react";

interface MembershipEntry {
  membershipId: number;
  membershipName: string;
  membershipAmount: number;
}

const SettingsManagement: React.FC = () => {
  const [membershipList, setMembershipList] = useState<MembershipEntry[]>([]);

  useEffect(() => {
    const fetchMembership = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/getMemberShip");
        const data = await res.json();
        setMembershipList(data);
      } catch (err) {
        console.error("Error fetching membership settings:", err);
      }
    };

    fetchMembership();
  }, []);

  const handleSave = async () => {
    try {
      console.log(membershipList);
      axios.put("http://localhost:8080/api/addMemberShip", membershipList);
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save membership settings.");
    }
  };

  const updateMembershipAmount = (id: number, amount: number) => {
    setMembershipList((prev) =>
      prev.map((item) =>
        item.membershipId === id
          ? { ...item, membershipAmount: isNaN(amount) ? 0 : amount }
          : item
      )
    );
  };

  const renderMembershipSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Membership Pricing
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {membershipList.map((membership) => (
          <div key={membership.membershipId}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {membership.membershipName}
            </label>
            <input
              type="number"
              value={membership.membershipAmount}
              onChange={(e) =>
                updateMembershipAmount(
                  membership.membershipId,
                  parseFloat(e.target.value)
                )
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {renderMembershipSettings()}
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Save Membership
      </button>
    </div>
  );
};

export default SettingsManagement;
