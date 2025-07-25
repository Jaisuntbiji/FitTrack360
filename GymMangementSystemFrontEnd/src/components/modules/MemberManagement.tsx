import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  CheckCircle,
  Mail,
  Phone,
  Eye,
  EyeOff,
} from "lucide-react";

type Member = {
  memberId: number;
  memberName: string | null;
  memberEmail: string | null;
  memberPassword: String | null;
  memberPhoneNo: number | string | null;
  memberShipType: string;
  startDate: string;
  expiryDate: string;
  status: string;
};

type User = {
  userEmail: String;
  userPassword: String;
  userName: String;
  userRole: String;
};

const MemberManagement: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);
  const [viewImageUrl, setViewImageUrl] = useState<string | null>(null);
  const [emailTouched, setEmailTouched] = useState(false);
  const [userForm, setuserForm] = useState({
    userEmail: "",
    userPassword: "",
    userName: "",
    userRole: "member",
  });
  const [formData, setFormData] = useState({
    memberName: "",
    memberEmail: "",
    memberPassWord: "",
    memberPhoneNo: "",
    memberShipType: "",
    startDate: "",
    expiryDate: "",
    status: "active" as const,
    file: null as File | null,
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

  const formatDate = (date: String) => {
    const dataOnly = date.split("T");
    const [year, month, day] = dataOnly[0].split("-");
    return `${day}-${month}-${year}`; // Convert to DD-MM-YYYY
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingMember) {
        await axios.put("http://localhost:8080/api/updateMember", {
          ...editingMember,
          ...formData,
        });
        await axios.put("http://localhost:8080/api/updateUser", {
          ...editingUser,
          ...userForm,
        });
      } else {
        // await axios.post("http://localhost:8080/api/addMember", formData);

        const data = new FormData();
        data.append(
          "member",
          new Blob([JSON.stringify(formData)], { type: "application/json" })
        );
        if (formData.file) {
          data.append("file", formData.file);
        }

        await axios.post("http://localhost:8080/api/addMember", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(formData.memberEmail);
        setuserForm({
          ...userForm,
          userEmail: formData.memberEmail,
          userName: formData.memberName,
        });
        await axios.post("http://localhost:8080/api/addUser", userForm);
      }
      resetForm();
      const res = await axios.get("http://localhost:8080/api/viewMember");
      setMembers(res.data);
    } catch (error) {
      console.error("Error submitting member", error);
    }
  };
  //Method for checking the email is availability
  const checkEmailAvailability = async (email: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/emailCheck/${email}`
      );
      setEmailAvailable(response.data);
      console.log(emailAvailable);
    } catch (error) {
      console.error("Error checking email availability", error);
      setEmailAvailable(false);
      // setEmailTouched(false);
      // assume taken if error
    }
  };

  const resetForm = () => {
    setFormData({
      memberName: "",
      memberEmail: "",
      memberPassWord: "",
      memberPhoneNo: "",
      memberShipType: "",
      startDate: "",
      expiryDate: "",
      file: null,
      status: "active",
    });
    setEditingMember(null);
    setIsModalOpen(false);
    setEmailAvailable(false);
    setEmailTouched(false);
  };

  const handleEdit = async (member: Member) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/getMember/${member.memberId}`
      );
      const pass = await axios.get(
        `http://localhost:8080/api/getUser/${member.memberEmail}`
      );
      setFormData(res.data);
      setuserForm(pass.data);
      setEditingMember(member);
      setEditingUser(userForm);
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
                      Started: {formatDate(member.startDate)}
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
                    {formatDate(member.expiryDate)}
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
                      {member.memberEmail && (
                        <button
                          onClick={() =>
                            setViewImageUrl(
                              `http://localhost:8080/api/viewImage/${member.memberEmail}`
                            )
                          }
                          className="text-green-600 hover:text-green-900 p-1 hover:bg-green-50 rounded"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                      {viewImageUrl && (
                        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
                          <div className="bg-white p-4 rounded-xl shadow-xl max-w-md w-full relative">
                            <h2 className="text-lg font-semibold mb-2">
                              Member Image
                            </h2>
                            <img
                              src={viewImageUrl}
                              alt="Member"
                              className="w-full h-auto rounded"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "/placeholder.jpg";
                              }}
                            />
                            <button
                              onClick={() => setViewImageUrl(null)}
                              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      )}
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
              <div className="relative">
                <input
                  value={formData.memberEmail}
                  onChange={(e) => {
                    setFormData({ ...formData, memberEmail: e.target.value });
                    setEmailTouched(false); // reset touched until blur
                    setEmailAvailable(null); // reset check status
                  }}
                  onBlur={() => {
                    setEmailTouched(true);
                    checkEmailAvailability(formData.memberEmail);
                  }}
                  required
                  placeholder="Email"
                  className={`w-full border rounded px-3 py-2 ${
                    emailTouched && emailAvailable === false
                      ? "border-red-500"
                      : emailTouched && emailAvailable === true
                      ? "border-green-500"
                      : ""
                  }`}
                />
                {emailTouched && emailAvailable === true && (
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600">
                    <CheckCircle />
                  </span>
                )}
                {emailTouched && emailAvailable === false && (
                  <p className="text-red-500 text-sm mt-1">
                    This email is already used.
                  </p>
                )}
              </div>

              <div className="relative">
                {/* <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={userForm.userPassword}
                  onChange={(e) =>
                    setuserForm({ ...userForm, userPassword: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <input
                value={formData.memberPhoneNo ?? ""}
                onChange={(e) =>
                  setFormData({ ...formData, memberPhoneNo: e.target.value })
                }
                required
                maxLength={10}
                placeholder="Phone"
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    file: e.target.files?.[0] || null,
                  })
                }
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
