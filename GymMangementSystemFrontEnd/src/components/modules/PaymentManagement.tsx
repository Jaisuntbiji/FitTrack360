import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CreditCard,
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
} from "lucide-react";
import { useData } from "../../contexts/DataContext";

export interface Payment {
  paymentId: number;
  memberId: string;
  payment_amount: number;
  payment_type: string;
  payment_status: "paid" | "pending" | "overdue";
  payment_dueDate: string;
  payment_paidDate?: string;
}

const PaymentManagement: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [memberNames, setMemberNames] = useState<Record<string, string>>({});
  const { updatePayment } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    memberId: "",
    payment_amount: 0,
    payment_type: "",
    payment_status: "pending",
    payment_dueDate: "",
  });

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/listPayment");
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  const fetchMemberName = async (memberId: string) => {
    try {
      if (!memberNames[memberId]) {
        const response = await axios.get(
          `http://localhost:8080/api/getMember/${memberId}`
        );
        const name = response.data?.memberName || "Unknown Member";
        setMemberNames((prev) => ({ ...prev, [memberId]: name }));
      }
    } catch (error) {
      console.error("Error fetching member name:", error);
      setMemberNames((prev) => ({ ...prev, [memberId]: "Unknown Member" }));
    }
  };

  const getMemberName = (memberId: string): string => {
    if (memberNames[memberId]) {
      return memberNames[memberId];
    } else {
      fetchMemberName(memberId);
      return "Loading...";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "overdue":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const markAsPaid = (paymentId: number) => {
    updatePayment(String(paymentId), {
      status: "paid",
      paidDate: new Date().toISOString().split("T")[0],
    });
  };

  const filteredPayments = payments.filter((payment) => {
    const memberName = getMemberName(payment.memberId).toLowerCase();
    const matchesSearch =
      memberName.includes(searchTerm.toLowerCase()) ||
      (payment.payment_type?.toLowerCase() ?? "").includes(
        searchTerm.toLowerCase()
      );
    const matchesStatus =
      selectedStatus === "all" || payment.payment_status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = payments
    .filter((p) => p.payment_status === "paid")
    .reduce((sum, p) => sum + (p.payment_amount || 0), 0);
  const pendingAmount = payments
    .filter((p) => p.payment_status === "pending")
    .reduce((sum, p) => sum + (p.payment_amount || 0), 0);
  const overdueAmount = payments
    .filter((p) => p.payment_status === "overdue")
    .reduce((sum, p) => sum + (p.payment_amount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Payment Management
          </h1>
          <p className="text-gray-600 mt-2">Track and manage member payments</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-green-600 transition-all flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Payment</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Revenue" value={totalRevenue} color="green" />
        <StatCard
          label="Pending Payments"
          value={pendingAmount}
          color="yellow"
        />
        <StatCard label="Overdue Amount" value={overdueAmount} color="red" />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search payments..."
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
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <Th label="Member" />
                <Th label="Payment Type" />
                <Th label="Amount" />
                <Th label="Status" />
                <Th label="Due Date" />
                <Th label="Actions" />
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr
                  key={payment.paymentId}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {getMemberName(payment.memberId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.payment_type || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${payment.payment_amount?.toLocaleString() ?? "0"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(payment.payment_status)}
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          payment.payment_status
                        )}`}
                      >
                        {payment.payment_status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.payment_dueDate?.split("T")[0]}
                    {payment.payment_paidDate && (
                      <div className="text-xs text-gray-500">
                        Paid: {payment.payment_paidDate.split("T")[0]}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {payment.payment_status === "pending" && (
                      <button
                        onClick={() => markAsPaid(payment.paymentId)}
                        className="bg-green-100 text-green-800 hover:bg-green-200 px-3 py-1 rounded-lg transition-colors text-sm"
                      >
                        Mark as Paid
                      </button>
                    )}
                    {payment.payment_status === "paid" && (
                      <span className="text-green-600 text-sm">
                        ✓ Completed
                      </span>
                    )}
                    {payment.payment_status === "overdue" && (
                      <button
                        onClick={() => markAsPaid(payment.paymentId)}
                        className="bg-red-100 text-red-800 hover:bg-red-200 px-3 py-1 rounded-lg transition-colors text-sm"
                      >
                        Collect Payment
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Payment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-4">
            <h2 className="text-xl font-semibold">Add New Payment</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await axios.post(
                    "http://localhost:8080/api/addPayment",
                    formData
                  );
                  await fetchPayments();
                  setIsModalOpen(false);
                  setFormData({
                    memberId: "",
                    payment_amount: 0,
                    payment_type: "",
                    payment_status: "pending",
                    payment_dueDate: "",
                  });
                } catch (error) {
                  console.error("Error adding payment:", error);
                }
              }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Member ID"
                value={formData.memberId}
                onChange={(e) =>
                  setFormData({ ...formData, memberId: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              />
              <input
                type="number"
                placeholder="Amount"
                value={formData.payment_amount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    payment_amount: Number(e.target.value),
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              />
              <input
                type="text"
                placeholder="Type"
                value={formData.payment_type}
                onChange={(e) =>
                  setFormData({ ...formData, payment_type: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              />
              <input
                type="date"
                value={formData.payment_dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, payment_dueDate: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Components
const Th = ({ label }: { label: string }) => (
  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    {label}
  </th>
);

const StatCard = ({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "green" | "yellow" | "red";
}) => {
  const colorMap = {
    green: ["bg-green-100", "text-green-600"],
    yellow: ["bg-yellow-100", "text-yellow-600"],
    red: ["bg-red-100", "text-red-600"],
  }[color];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className={`text-2xl font-bold ${colorMap[1]}`}>
            ${value.toLocaleString()}
          </p>
        </div>
        <div
          className={`w-12 h-12 ${colorMap[0]} rounded-lg flex items-center justify-center`}
        >
          {color === "green" ? (
            <CheckCircle className={colorMap[1]} />
          ) : color === "yellow" ? (
            <Clock className={colorMap[1]} />
          ) : (
            <AlertCircle className={colorMap[1]} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentManagement;
