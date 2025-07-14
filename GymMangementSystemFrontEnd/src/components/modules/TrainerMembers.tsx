import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Search, User, Mail, Phone, Calendar, TrendingUp } from 'lucide-react';

const TrainerMembers: React.FC = () => {
  const { members } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter members assigned to current trainer (assuming trainer ID is '1')
  const trainerMembers = members.filter(member => member.trainerId === '1');
  
  const filteredMembers = trainerMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const memberProgress = [
    { memberId: '1', workoutsThisMonth: 12, lastWorkout: '2024-12-01', goal: 'Weight Loss', progress: 75 },
  ];

  const getMemberProgress = (memberId: string) => {
    return memberProgress.find(p => p.memberId === memberId) || {
      workoutsThisMonth: 0,
      lastWorkout: 'Never',
      goal: 'Not Set',
      progress: 0
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Members</h1>
        <p className="text-gray-600 mt-2">Track and manage your assigned members</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Members</p>
              <p className="text-2xl font-bold text-blue-600">{trainerMembers.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Members</p>
              <p className="text-2xl font-bold text-green-600">
                {trainerMembers.filter(m => m.status === 'active').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-purple-600">48</p>
              <p className="text-xs text-gray-500">Total Workouts</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Progress</p>
              <p className="text-2xl font-bold text-orange-600">75%</p>
              <p className="text-xs text-gray-500">Goal Achievement</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => {
          const progress = getMemberProgress(member.id);
          return (
            <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${
                  member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {member.status}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {member.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {member.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Expires: {member.expiryDate}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Goal Progress</span>
                  <span className="text-sm font-medium text-blue-600">{progress.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${progress.progress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>Goal: {progress.goal}</p>
                  <p>Workouts this month: {progress.workoutsThisMonth}</p>
                  <p>Last workout: {progress.lastWorkout}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex space-x-2">
                <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-3 rounded-lg transition-colors text-sm font-medium">
                  View Profile
                </button>
                <button className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 py-2 px-3 rounded-lg transition-colors text-sm font-medium">
                  Update Progress
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMembers.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Members Found</h3>
          <p className="text-gray-600">
            {searchTerm ? 'No members match your search criteria.' : 'You have no assigned members yet.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default TrainerMembers;