import React, { useEffect, useState } from "react";
import { Plus, Search, Edit, Trash2, Mail, Phone, Award } from "lucide-react";
import axios from "axios";

interface Trainer {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialties: string[];
  schedule: string[];
  status: string;
}

const TrainerManagement: React.FC = () => {
  const [trainersList, setTrainerslist] = useState<Trainer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState<Trainer | null>(null);
  const [formData, setFormData] = useState({
    trainerId: "",
    trainerName: "",
    trainerEmail: "",
    trainerPhone: "",
    trainerSpecialties: [] as string[],
    trainerSchedule: [] as string[],
    trainerStatus: "active" as const,
  });

  const fetchTrainers = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/viewTrainer");
      const data = await res.json();

      const formatted = data.map((trainer: any) => ({
        id: trainer.trainerId,
        name: trainer.trainerName,
        email: trainer.trainerEmail,
        phone: trainer.trainerPhone,
        specialties: trainer.trainerSpecialties?.split(",") || [],
        schedule: trainer.trainerSchedule?.split("\n") || [],
        status: trainer.trainerStatus,
      }));
      console.log("Fetched trainers:", formatted);
      setTrainerslist(formatted);
    } catch (error) {
      console.error("Error fetching trainers:", error);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const handleDelete = async (trainer: Trainer) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/deleteTrainer/${trainer.id}`
      );
      fetchTrainers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTrainer) {
        await axios.put("http://localhost:8080/api/updateTrainer", {
          ...formData,
          trainerSpecialties: formData.trainerSpecialties.join(","),
          trainerSchedule: formData.trainerSchedule.join("\n"),
        });
      } else {
        await axios.post("http://localhost:8080/api/addTrainer", {
          ...formData,
          trainerSpecialties: formData.trainerSpecialties.join(","),
          trainerSchedule: formData.trainerSchedule.join("\n"),
        });
      }
      resetForm();
      fetchTrainers();
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setFormData({
      trainerId: "",
      trainerName: "",
      trainerEmail: "",
      trainerPhone: "",
      trainerSpecialties: [] as string[],
      trainerSchedule: [] as string[],
      trainerStatus: "active",
    });
    setEditingTrainer(null);
    setIsModalOpen(false);
  };

  const handleEdit = async (trainer: Trainer) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/findTrainer/${trainer.id}`
      );
      const data = res.data;
      console.log("Edit handler data:", data);

      setFormData({
        trainerId: data.trainerId,
        trainerName: data.trainerName,
        trainerEmail: data.trainerEmail,
        trainerPhone: data.trainerPhone,
        trainerSpecialties: data.trainerSpecialties?.split(",") || [],
        trainerSchedule: data.trainerSchedule?.split("\n") || [],
        trainerStatus: data.trainerStatus,
      });

      setEditingTrainer(trainer);
      setIsModalOpen(true);
    } catch (error) {
      console.log("Edit handler error:", error);
    }
  };

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        trainerSpecialties: [...formData.trainerSpecialties, specialty],
      });
    } else {
      setFormData({
        ...formData,
        trainerSpecialties: formData.trainerSpecialties.filter(
          (s) => s !== specialty
        ),
      });
    }
  };

  const filteredTrainers = trainersList.filter(
    (trainer) =>
      trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const specialtyOptions = [
    "Weight Training",
    "CrossFit",
    "Yoga",
    "Pilates",
    "Cardio",
    "Strength Training",
    "HIIT",
    "Zumba",
    "Boxing",
    "Swimming",
    "Martial Arts",
    "Functional Training",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Trainer Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage gym trainers and their specialties
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-green-600 transition-all flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Trainer</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search trainers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Trainers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainersList.map((trainer) => (
          <div
            key={trainer.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {trainer.name}
              </h3>
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${
                  trainer.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {trainer.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                {trainer.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                {trainer.phone}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Specialties
              </h4>
              <div className="flex flex-wrap gap-1">
                {trainer.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Schedule
              </h4>
              <div className="space-y-1">
                {trainer.schedule.map((schedule, index) => (
                  <div
                    key={index}
                    className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded"
                  >
                    {schedule}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center space-x-2 pt-4 border-t border-gray-100">
              <button
                onClick={() => handleEdit(trainer)}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 px-3 py-1 hover:bg-blue-50 rounded"
              >
                <Edit className="w-4 h-4" />
                <span className="text-sm">Edit</span>
              </button>
              <button
                onClick={() => handleDelete(trainer)}
                className="flex items-center space-x-1 text-red-600 hover:text-red-800 px-3 py-1 hover:bg-red-50 rounded"
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-sm">Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Trainer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingTrainer ? "Edit Trainer" : "Add New Trainer"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.trainerName}
                    onChange={(e) =>
                      setFormData({ ...formData, trainerName: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.trainerStatus}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        trainerStatus: e.target.value as any,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.trainerEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, trainerEmail: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.trainerPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, trainerPhone: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialties
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {specialtyOptions.map((specialty) => (
                    <label
                      key={specialty}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={formData.trainerSpecialties.includes(
                          specialty
                        )}
                        onChange={(e) =>
                          handleSpecialtyChange(specialty, e.target.checked)
                        }
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{specialty}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Schedule
                </label>
                <textarea
                  value={formData.trainerSchedule.join("\n")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      trainerSchedule: e.target.value
                        .split("\n")
                        .filter((s) => s.trim()),
                    })
                  }
                  placeholder="Enter schedule (one per line)&#10;e.g., Monday 9-17&#10;Tuesday 10-18"
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
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
                  {editingTrainer ? "Update" : "Add"} Trainer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerManagement;
