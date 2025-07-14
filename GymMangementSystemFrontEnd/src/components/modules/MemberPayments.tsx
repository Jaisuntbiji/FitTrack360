import React from 'react';
import { useData } from '../../contexts/DataContext';
import { CreditCard, Calendar, CheckCircle, Clock, AlertCircle, Download } from 'lucide-react';

const MemberPayments: React.FC = () => {
  const { payments } = useData();

  // Mock member payments - in a real app, this would be filtered by member ID
  const memberPayments = [
    {
      id: '1',
      amount: 80,
      type: 'Premium Monthly',
      status: 'paid' as const,
      dueDate: '2024-12-01',
      paidDate: '2024-11-28',
      method: 'Credit Card',
      invoice: 'INV-2024-001'
    },
    {
      id: '2',
      amount: 80,
      type: 'Premium Monthly',
      status: 'pending' as const,
      dueDate: '2025-01-01',
      method: 'Auto-pay',
      invoice: 'INV-2024-002'
    },
    {
      id: '3',
      amount: 50,
      type: 'Basic Monthly',
      status: 'paid' as const,
      dueDate: '2024-11-01',
      paidDate: '2024-10-30',
      method: 'Bank Transfer',
      invoice: 'INV-2024-003'
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'overdue':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalPaid = memberPayments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = memberPayments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const nextPayment = memberPayments.find(p => p.status === 'pending');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Payments</h1>
        <p className="text-gray-600 mt-2">View your payment history and manage billing</p>
      </div>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Amount</p>
              <p className="text-2xl font-bold text-yellow-600">${pendingAmount}</p>
              <p className="text-xs text-gray-500">Due soon</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Next Payment</p>
              <p className="text-lg font-bold text-blue-600">
                {nextPayment ? `$${nextPayment.amount}` : 'None'}
              </p>
              <p className="text-xs text-gray-500">
                {nextPayment ? nextPayment.dueDate : 'No pending payments'}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Next Payment Alert */}
      {nextPayment && (
        <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Upcoming Payment</h3>
              <p className="text-2xl font-bold">${nextPayment.amount}</p>
              <div className="flex items-center space-x-4 mt-3 text-blue-100">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Due: {nextPayment.dueDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CreditCard className="w-4 h-4" />
                  <span>{nextPayment.type}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Payment History</h3>
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
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {memberPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{payment.invoice}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{payment.type}</div>
                    <div className="text-sm text-gray-500">{payment.method}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${payment.amount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(payment.status)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{payment.dueDate}</div>
                    {payment.paidDate && (
                      <div className="text-sm text-gray-500">Paid: {payment.paidDate}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 hover:bg-blue-50 px-2 py-1 rounded">
                        View
                      </button>
                      <button className="text-green-600 hover:text-green-900 hover:bg-green-50 px-2 py-1 rounded">
                        Download
                      </button>
                      {payment.status === 'pending' && (
                        <button className="text-purple-600 hover:text-purple-900 hover:bg-purple-50 px-2 py-1 rounded">
                          Pay
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-600">Expires 12/26</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                Default
              </span>
              <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
            </div>
          </div>
          
          <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors">
            + Add New Payment Method
          </button>
        </div>
      </div>

      {/* Auto-pay Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Auto-pay</h3>
            <p className="text-gray-600 mt-1">Automatically pay your membership fees</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default MemberPayments;