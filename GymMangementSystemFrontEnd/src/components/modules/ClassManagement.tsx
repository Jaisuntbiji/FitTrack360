import React, { useState } from 'react';
import { useData, GymClass } from '../../contexts/DataContext';
import { Plus, Search, Edit, Trash2, Users, Clock, Calendar } from 'lucide-react';

const ClassManagement: React.FC = () => {
  const { classes, trainers, addClass } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    trainerId: '',
    schedule: '',
    capacity: 20,
    duration: '',
  });

  const filteredClasses = classes.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addClass({ ...formData, enrolled: 0 });
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      trainerId: '',
      schedule: '',
      capacity: 20,
      duration: '',
    });
    setIsModalOpen(false);
  };

  const getTrainerName = (trainerId: string) => {
    const trainer = trainers.find(t => t.id === trainerId);
    return trainer ? trainer.name : 'Unknown Trainer';
  };

  const getCapacityColor = (enrolled: number, capacity: number) => {
    const percentage = (enrolled / capacity) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Class Management</h1>
          <p className="text-gray-600 mt-2">Manage gym classes and schedules</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-green-600 transition-all flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Class</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search classes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((cls) => (
          <div key={cls.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{cls.name}</h3>
              <div className="flex space-x-1">
                <button className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
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

            <div className="border-t border-gray-100 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Enrollment</span>
                <span className={`text-sm font-medium ${getCapacityColor(cls.enrolled, cls.capacity)}`}>
                  {cls.enrolled}/{cls.capacity}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    (cls.enrolled / cls.capacity) * 100 >= 90 ? 'bg-red-500' :
                    (cls.enrolled / cls.capacity) * 100 >= 70 ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${Math.min((cls.enrolled / cls.capacity) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-lg transition-colors text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Class Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Class</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Morning Yoga"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trainer</label>
                <select
                  value={formData.trainerId}
                  onChange={(e) => setFormData({ ...formData, trainerId: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select trainer</option>
                  {trainers.filter(t => t.status === 'active').map((trainer) => (
                    <option key={trainer.id} value={trainer.id}>
                      {trainer.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Schedule</label>
                <input
                  type="text"
                  value={formData.schedule}
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Mon-Wed-Fri 7:00 AM"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    max="50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 60 min"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:from-blue-600 hover:to-green-600 transition-all"
                >
                  Add Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassManagement;