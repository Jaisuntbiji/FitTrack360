import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { BarChart3, TrendingUp, Users, CreditCard, Download, Calendar } from 'lucide-react';

const ReportsManagement: React.FC = () => {
  const { members, payments, classes } = useData();
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedReport, setSelectedReport] = useState('overview');

  const getRevenueData = () => {
    const paidPayments = payments.filter(p => p.status === 'paid');
    const totalRevenue = paidPayments.reduce((sum, p) => sum + p.amount, 0);
    const monthlyRevenue = paidPayments
      .filter(p => p.paidDate && new Date(p.paidDate).getMonth() === new Date().getMonth())
      .reduce((sum, p) => sum + p.amount, 0);
    
    return { totalRevenue, monthlyRevenue };
  };

  const getMembershipData = () => {
    const activeMembers = members.filter(m => m.status === 'active').length;
    const expiredMembers = members.filter(m => m.status === 'expired').length;
    const suspendedMembers = members.filter(m => m.status === 'suspended').length;
    
    return { activeMembers, expiredMembers, suspendedMembers };
  };

  const getClassData = () => {
    const totalClasses = classes.length;
    const totalEnrollment = classes.reduce((sum, c) => sum + c.enrolled, 0);
    const averageOccupancy = totalClasses > 0 ? Math.round((totalEnrollment / classes.reduce((sum, c) => sum + c.capacity, 0)) * 100) : 0;
    
    return { totalClasses, totalEnrollment, averageOccupancy };
  };

  const { totalRevenue, monthlyRevenue } = getRevenueData();
  const { activeMembers, expiredMembers, suspendedMembers } = getMembershipData();
  const { totalClasses, totalEnrollment, averageOccupancy } = getClassData();

  const reportData = [
    {
      id: 'overview',
      title: 'Business Overview',
      description: 'Key performance indicators and overall business metrics',
      stats: [
        { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: CreditCard, color: 'text-green-600' },
        { label: 'Active Members', value: activeMembers, icon: Users, color: 'text-blue-600' },
        { label: 'Class Occupancy', value: `${averageOccupancy}%`, icon: BarChart3, color: 'text-purple-600' },
        { label: 'Monthly Growth', value: '+12%', icon: TrendingUp, color: 'text-orange-600' },
      ]
    },
    {
      id: 'membership',
      title: 'Membership Report',
      description: 'Detailed breakdown of membership statistics',
      stats: [
        { label: 'Active Members', value: activeMembers, icon: Users, color: 'text-green-600' },
        { label: 'Expired Members', value: expiredMembers, icon: Users, color: 'text-red-600' },
        { label: 'Suspended Members', value: suspendedMembers, icon: Users, color: 'text-yellow-600' },
        { label: 'Total Members', value: members.length, icon: Users, color: 'text-blue-600' },
      ]
    },
    {
      id: 'revenue',
      title: 'Revenue Report',
      description: 'Financial performance and payment tracking',
      stats: [
        { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: CreditCard, color: 'text-green-600' },
        { label: 'Monthly Revenue', value: `$${monthlyRevenue.toLocaleString()}`, icon: CreditCard, color: 'text-blue-600' },
        { label: 'Pending Payments', value: payments.filter(p => p.status === 'pending').length, icon: CreditCard, color: 'text-yellow-600' },
        { label: 'Overdue Payments', value: payments.filter(p => p.status === 'overdue').length, icon: CreditCard, color: 'text-red-600' },
      ]
    }
  ];

  const currentReport = reportData.find(r => r.id === selectedReport) || reportData[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-2">Business insights and performance metrics</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
            <option value="quarterly">This Quarter</option>
            <option value="yearly">This Year</option>
          </select>
          <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-green-600 transition-all flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Report Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1">
        <div className="flex space-x-1">
          {reportData.map((report) => (
            <button
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                selectedReport === report.id
                  ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {report.title}
            </button>
          ))}
        </div>
      </div>

      {/* Report Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{currentReport.title}</h2>
          <p className="text-gray-600 mt-1">{currentReport.description}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {currentReport.stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
                  </div>
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chart Placeholder */}
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Interactive Charts</h3>
          <p className="text-gray-600">
            Detailed charts and graphs would be displayed here showing trends, comparisons, and analytics based on the selected report type and time period.
          </p>
        </div>
      </div>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Classes</h3>
          <div className="space-y-3">
            {classes.map((cls, index) => (
              <div key={cls.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{cls.name}</p>
                  <p className="text-sm text-gray-600">{cls.schedule}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{cls.enrolled}/{cls.capacity}</p>
                  <p className="text-sm text-gray-600">{Math.round((cls.enrolled / cls.capacity) * 100)}% full</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Payment received</p>
                <p className="text-xs text-gray-600">Alice Johnson - $1,200</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">New member registered</p>
                <p className="text-xs text-gray-600">John Smith - Premium Monthly</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Class scheduled</p>
                <p className="text-xs text-gray-600">Evening Yoga - Sarah Davis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsManagement;