import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Calendar, Clock, Users, MapPin, Plus, Search } from 'lucide-react';

const MemberClasses: React.FC = () => {
  const { classes, trainers } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock enrolled classes for the member
  const [enrolledClasses, setEnrolledClasses] = useState(['1']);

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'enrolled' && enrolledClasses.includes(cls.id)) ||
                         (selectedFilter === 'available' && !enrolledClasses.includes(cls.id));
    return matchesSearch && matchesFilter;
  });

  const getTrainerName = (trainerId: string) => {
    const trainer = trainers.find(t => t.id === trainerId);
    return trainer ? trainer.name : 'Unknown Trainer';
  };

  const handleEnrollment = (classId: string) => {
    if (enrolledClasses.includes(classId)) {
      setEnrolledClasses(prev => prev.filter(id => id !== classId));
    } else {
      setEnrolledClasses(prev => [...prev, classId]);
    }
  };

  const upcomingClasses = [
    { name: 'Morning Yoga', time: 'Today 7:00 AM', location: 'Studio A' },
    { name: 'CrossFit Training', time: 'Tomorrow 6:00 PM', location: 'Gym Floor' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Classes</h1>
        <p className="text-gray-600 mt-2">Book and manage your class schedule</p>
      </div>

      {/* Upcoming Classes */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Upcoming Classes</h3>
        <div className="space-y-3">
          {upcomingClasses.map((cls, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white bg-opacity-20 rounded-lg">
              <div>
                <p className="font-medium">{cls.name}</p>
                <div className="flex items-center space-x-4 text-sm text-blue-100">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{cls.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{cls.location}</span>
                  </div>
                </div>
              </div>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Enrolled Classes</p>
              <p className="text-2xl font-bold text-blue-600">{enrolledClasses.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Classes This Month</p>
              <p className="text-2xl font-bold text-green-600">12</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Favorite Class</p>
              <p className="text-lg font-bold text-purple-600">Yoga</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
              <p className="text-2xl font-bold text-orange-600">92%</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search classes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Classes
            </button>
            <button
              onClick={() => setSelectedFilter('enrolled')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedFilter === 'enrolled'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              My Classes
            </button>
            <button
              onClick={() => setSelectedFilter('available')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedFilter === 'available'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Available
            </button>
          </div>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((cls) => {
          const isEnrolled = enrolledClasses.includes(cls.id);
          const spotsLeft = cls.capacity - cls.enrolled;
          
          return (
            <div key={cls.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{cls.name}</h3>
                {isEnrolled && (
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                    Enrolled
                  </span>
                )}
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>Trainer: {getTrainerName(cls.trainerId)}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{cls.schedule}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{cls.duration}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Availability</span>
                  <span className={`text-sm font-medium ${
                    spotsLeft > 5 ? 'text-green-600' : spotsLeft > 0 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {spotsLeft > 0 ? `${spotsLeft} spots left` : 'Full'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      spotsLeft > 5 ? 'bg-green-500' : spotsLeft > 0 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min((cls.enrolled / cls.capacity) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleEnrollment(cls.id)}
                  disabled={!isEnrolled && spotsLeft === 0}
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors font-medium ${
                    isEnrolled
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : spotsLeft > 0
                      ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isEnrolled ? 'Unenroll' : spotsLeft > 0 ? 'Enroll' : 'Full'}
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">
                  Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredClasses.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Classes Found</h3>
          <p className="text-gray-600">
            {searchTerm ? 'No classes match your search criteria.' : 'No classes available at the moment.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default MemberClasses;