import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CreditCard,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Member } from "../../contexts/DataContext";

interface Payment {
  id: string;
  amount: number;
  type: string;
  status: "paid" | "pending" | "overdue";
  dueDate: string;
  paidDate?: string;
  method: string;
  invoice: string;
}

const MemberPayments: React.FC = () => {
  const { user } = useAuth();
  const [memberPayments, setMemberPayments] = useState<Payment[]>([]);
  const [memberId, setMemberId] = useState<string | null>(null);

  useEffect(() => {
    const fetchMemberPayments = async () => {
      try {
        if (user?.userEmail) {
          // 1. Get Member by Email
          const memberRes = await axios.get<Member>(
            `http://localhost:8080/api/getMemberByEmail/${user.userEmail}`
          );
          const member = memberRes.data;
          console.log(member.memberId);

          // ✅ Use member.id directly
          const paymentRes = await axios.get<Payment[]>(
            `http://localhost:8080/api/paymentList/${member.memberId}`
          );

          const paymentList = paymentRes.data;

          const formattedPayments = paymentList.map((p: any) => ({
            id: p.paymentId,
            amount: p.payment_amount,
            type: p.payment_type,
            status: p.payment_status,
            dueDate: p.payment_dueDate,
            paidDate: p.payment_paidDate,
            method: p.payment_type, // If needed
            invoice: `INV-${p.paymentId}`, // Placeholder
          }));

          console.log(formattedPayments);

          setMemberPayments(formattedPayments);
        }
      } catch (error) {
        console.error("Error fetching payment data:", error);
        x;
      }
    };

    fetchMemberPayments();
  }, [user]);
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

  const totalPaid = memberPayments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = memberPayments
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);

  const nextPayment = memberPayments
    .filter((p) => p.status === "pending")
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    )[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Payments</h1>
        <p className="text-gray-600 mt-2">
          View your payment history and manage billing
        </p>
      </div>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Paid */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Paid</p>
              <p className="text-2xl font-bold text-green-600">${totalPaid}</p>
              <p className="text-xs text-gray-500">This year</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Pending Amount */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Pending Amount
              </p>
              <p className="text-2xl font-bold text-yellow-600">
                ${pendingAmount}
              </p>
              <p className="text-xs text-gray-500">Due soon</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Next Payment */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Next Payment</p>
              <p className="text-lg font-bold text-blue-600">
                {nextPayment ? `$${nextPayment.amount}` : "None"}
              </p>
              <p className="text-xs text-gray-500">
                {nextPayment ? nextPayment.dueDate : "No pending payments"}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Payment History Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Payment History
          </h3>
          <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {memberPayments.map((payment) => (
                <tr
                  key={payment.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {payment.invoice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {payment.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${payment.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(payment.status)}
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-semibold ${getStatusColor(
                          payment.status
                        )}`}
                      >
                        {payment.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {payment.dueDate}
                    {payment.paidDate && (
                      <div className="text-sm text-gray-500">
                        Paid: {payment.paidDate}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MemberPayments;
