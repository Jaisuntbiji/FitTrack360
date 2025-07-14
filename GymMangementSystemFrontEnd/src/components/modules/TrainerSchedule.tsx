import React from 'react';
import { Calendar, Clock, Users, MapPin } from 'lucide-react';

const TrainerSchedule: React.FC = () => {
  const schedule = [
    {
      id: '1',
      day: 'Monday',
      date: '2024-12-02',
      sessions: [
        { time: '07:00 - 08:00', class: 'Morning Yoga', members: 15, location: 'Studio A' },
        { time: '10:00 - 11:00', class: 'Personal Training', members: 1, location: 'Gym Floor' },
        { time: '18:00 - 19:00', class: 'Evening Yoga', members: 12, location: 'Studio A' },
      ]
    },
    {
      id: '2',
      day: 'Tuesday',
      date: '2024-12-03',
      sessions: [
        { time: '09:00 - 10:00', class: 'Pilates', members: 8, location: 'Studio B' },
        { time: '14:00 - 15:00', class: 'Personal Training', members: 1, location: 'Gym Floor' },
        { time: '19:00 - 20:00', class: 'Advanced Yoga', members: 10, location: 'Studio A' },
      ]
    },
    {
      id: '3',
      day: 'Wednesday',
      date: '2024-12-04',
      sessions: [
        { time: '07:00 - 08:00', class: 'Morning Yoga', members: 18, location: 'Studio A' },
        { time: '11:00 - 12:00', class: 'Meditation', members: 6, location: 'Quiet Room' },
        { time: '17:00 - 18:00', class: 'Flexibility Training', members: 9, location: 'Studio B' },
      ]
    },
  ];

  const upcomingClass = {
    name: 'Evening Yoga',
    time: '18:00 - 19:00',
    date: 'Today',
    members: 12,
    location: 'Studio A'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Schedule</h1>
        <p className="text-gray-600 mt-2">Manage your classes and training sessions</p>
      </div>

      {/* Next Class Card */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Next Class</h3>
            <p className="text-2xl font-bold">{upcomingClass.name}</p>
            <div className="flex items-center space-x-4 mt-3 text-blue-100">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{upcomingClass.time}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{upcomingClass.members} members</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{upcomingClass.location}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-blue-100">Starting in</p>
            <p className="text-3xl font-bold">2h 15m</p>
          </div>
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">This Week's Schedule</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {schedule.map((day) => (
            <div key={day.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{day.day}</h4>
                  <p className="text-sm text-gray-600">{new Date(day.date).toLocaleDateString()}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {day.sessions.length} session{day.sessions.length !== 1 ? 's' : ''}
                </div>
              </div>
              
              <div className="space-y-3">
                {day.sessions.map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{session.class}</p>
                        <p className="text-sm text-gray-600">{session.time}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{session.members} members</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{session.location}</span>
                      </div>
                      <button className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1 rounded-lg transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Schedule Class</h3>
          <p className="text-sm text-gray-600 mb-4">Add a new class to your schedule</p>
          <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-lg transition-colors">
            Schedule Now
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">View Members</h3>
          <p className="text-sm text-gray-600 mb-4">Check your assigned members</p>
          <button className="w-full bg-green-50 hover:bg-green-100 text-green-700 py-2 px-4 rounded-lg transition-colors">
            View Members
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Update Availability</h3>
          <p className="text-sm text-gray-600 mb-4">Modify your working hours</p>
          <button className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 py-2 px-4 rounded-lg transition-colors">
            Update Hours
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainerSchedule;