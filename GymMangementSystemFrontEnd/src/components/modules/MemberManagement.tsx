import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Search, Filter, Edit, Trash2, Mail, Phone } from "lucide-react";

type Member = {
  memberId: number;
  memberName: string | null;
  memberEmail: string | null;
  memberPhoneNo: number | string | null;
  memberShipType: string;
  startDate: string;
  expiryDate: string;
  status: string;
};

const MemberManagement: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [formData, setFormData] = useState({
    memberName: "",
    memberEmail: "",
    memberPhoneNo: "",
    memberShipType: "",
    startDate: "",
    expiryDate: "",
    status: "active" as const,
  });

  // ✅ Fetch members on load
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/viewMember");
        setMembers(res.data);
      } catch (error) {
        console.error("Error fetching members", error);
      }
    };
    fetchMembers();
  }, []);

  // ✅ Safe filtering with null check
  const filteredMembers = members.filter((member) => {
    const name = member.memberName ?? "";
    const email = member.memberEmail ?? "";
    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || member.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingMember) {
        await axios.put("http://localhost:8080/api/updateMember", {
          ...editingMember,
          ...formData,
        });
      } else {
        await axios.post("http://localhost:8080/api/addMember", formData);
      }
      resetForm();
      const res = await axios.get("http://localhost:8080/api/viewMember");
      setMembers(res.data);
    } catch (error) {
      console.error("Error submitting member", error);
    }
  };

  const resetForm = () => {
    setFormData({
      memberName: "",
      memberEmail: "",
      memberPhoneNo: "",
      memberShipType: "",
      startDate: "",
      expiryDate: "",
      status: "active",
    });
    setEditingMember(null);
    setIsModalOpen(false);
  };

  const handleEdit = async (member: Member) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/getMember/${member.memberId}`
      );
      setFormData(res.data);
      setEditingMember(member);
      setIsModalOpen(true);
    } catch (error) {
      console.log("Member Not updated");
    }
  };

  const handleDelete = async (member: Member) => {
    const confirmDelete = window.confirm(
      "Are you sure want to delete this member?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:8080/api/deleteMember/${member.memberId}`
      );
      const res = await axios.get("http://localhost:8080/api/viewMember");
      setMembers(res.data);
    } catch (error) {
      console.log("Member is not deleted. ID:" + member.memberId);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "suspended":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Member Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage gym members and their memberships
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-green-600 transition-all flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Member</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Membership
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiry Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMembers.map((member) => (
                <tr
                  key={member.memberId}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {member.memberName}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center space-x-4">
                        <span className="flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          {member.memberEmail}
                        </span>
                        <span className="flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          {member.memberPhoneNo}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {member.memberShipType}
                    </div>
                    <div className="text-sm text-gray-500">
                      Started: {member.startDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        member.status
                      )}`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.expiryDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(member)}
                        className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(member)}
                        className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingMember ? "Edit Member" : "Add New Member"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                value={formData.memberName}
                onChange={(e) =>
                  setFormData({ ...formData, memberName: e.target.value })
                }
                required
                placeholder="Name"
                className="w-full border rounded px-3 py-2"
              />
              <input
                value={formData.memberEmail}
                onChange={(e) =>
                  setFormData({ ...formData, memberEmail: e.target.value })
                }
                required
                placeholder="Email"
                className="w-full border rounded px-3 py-2"
              />
              <input
                value={formData.memberPhoneNo ?? ""}
                onChange={(e) =>
                  setFormData({ ...formData, memberPhoneNo: e.target.value })
                }
                required
                placeholder="Phone"
                className="w-full border rounded px-3 py-2"
              />
              <select
                value={formData.memberShipType}
                onChange={(e) =>
                  setFormData({ ...formData, memberShipType: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select Membership</option>
                <option value="Basic Monthly">Basic Monthly</option>
                <option value="Premium Monthly">Premium Monthly</option>
                <option value="Basic Annual">Basic Annual</option>
                <option value="Premium Annual">Premium Annual</option>
              </select>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) =>
                  setFormData({ ...formData, expiryDate: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              />
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as any })
                }
                className="w-full border rounded px-3 py-2"
              >
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="suspended">Suspended</option>
              </select>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-200 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  {editingMember ? "Update" : "Add"} Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberManagement;
