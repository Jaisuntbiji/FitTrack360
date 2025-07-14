import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Calendar, Clock, Users, CheckCircle, Search, Filter } from 'lucide-react';

const AttendanceManagement: React.FC = () => {
  const { members, classes } = useData();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');

  // Mock attendance data - in a real app, this would come from the data context
  const [attendanceRecords, setAttendanceRecords] = useState([
    { id: '1', memberId: '1', classId: '1', date: '2024-12-01', checkIn: '07:00', checkOut: '08:00', status: 'present' },
    { id: '2', memberId: '2', classId: '2', date: '2024-12-01', checkIn: '18:00', checkOut: '18:45', status: 'present' },
    { id: '3', memberId: '1', classId: '1', date: '2024-11-30', checkIn: '07:00', checkOut: '08:00', status: 'present' },
  ]);

  const getMemberName = (memberId: string) => {
    const member = members.find(m => m.id === memberId);
    return member ? member.name : 'Unknown Member';
  };

  const getClassName = (classId: string) => {
    const cls = classes.find(c => c.id === classId);
    return cls ? cls.name : 'Unknown Class';
  };

  const filteredRecords = attendanceRecords.filter(record => {
    const member = members.find(m => m.id === record.memberId);
    const memberName = member ? member.name.toLowerCase() : '';
    const matchesSearch = memberName.includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || record.classId === selectedClass;
    const matchesDate = record.date === selectedDate;
    return matchesSearch && matchesClass && matchesDate;
  });

  const markAttendance = (memberId: string, classId: string, status: 'present' | 'absent') => {
    const newRecord = {
      id: Date.now().toString(),
      memberId,
      classId,
      date: selectedDate,
      checkIn: status === 'present' ? new Date().toTimeString().slice(0, 5) : '',
      checkOut: '',
      status,
    };
    setAttendanceRecords(prev => [...prev, newRecord]);
  };

  const todayStats = {
    totalMembers: members.length,
    presentToday: attendanceRecords.filter(r => r.date === selectedDate && r.status === 'present').length,
    totalClasses: classes.length,
    attendanceRate: Math.round((attendanceRecords.filter(r => r.date === selectedDate && r.status === 'present').length / members.length) * 100),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Attendance Management</h1>
        <p className="text-gray-600 mt-2">Track member attendance and class participation</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Members</p>
              <p className="text-2xl font-bold text-gray-900">{todayStats.totalMembers}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Present Today</p>
              <p className="text-2xl font-bold text-green-600">{todayStats.presentToday}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
              <p className="text-2xl font-bold text-purple-600">{todayStats.attendanceRate}%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Classes</p>
              <p className="text-2xl font-bold text-orange-600">{todayStats.totalClasses}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Check-in */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Check-in</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.slice(0, 6).map((member) => (
            <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{member.name}</p>
                <p className="text-sm text-gray-500">{member.membershipType}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => markAttendance(member.id, '1', 'present')}
                  className="bg-green-100 text-green-800 hover:bg-green-200 px-3 py-1 rounded-lg transition-colors text-sm"
                >
                  Check In
                </button>
              </div>
            </div>
          ))}
        </div>
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
            <Calendar className="w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Classes</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Attendance Records */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Attendance Records - {new Date(selectedDate).toLocaleDateString()}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class/Activity
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check In
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check Out
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {getMemberName(record.memberId)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{getClassName(record.classId)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.checkIn || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.checkOut || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      record.status === 'present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {record.checkIn && record.checkOut ? '1h 00m' : '-'}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredRecords.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No attendance records found for the selected date and filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceManagement;