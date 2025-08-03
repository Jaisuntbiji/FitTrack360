import React from "react";
import { Bell, Search, LogOut, User } from "lucide-react";
import { User as UserType } from "../../contexts/AuthContext";

import { useState, useEffect } from "react";
import axios from "axios";

interface HeaderProps {
  user: UserType;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const [image, setImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/fechImage/${user.userEmail}/image`
    );
    setImage(response.data); // Already a Base64 string
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search members, trainers, classes..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button> */}

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <div
                className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center cursor-pointer"
                onClick={() => setShowModal(true)}
              >
                {image ? (
                  <img
                    src={`data:image/jpeg;base64,${image}`}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 text-white" />
                )}
              </div>

              {showModal && (
                <div
                  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                  onClick={() => setShowModal(false)}
                >
                  {image ? (
                    <img
                      src={`data:image/jpeg;base64,${image}`}
                      alt="Large Avatar"
                      className="max-w-xs max-h-xs rounded-full shadow-lg bg-transparent"
                      onClick={(e) => e.stopPropagation()} // prevent close when clicking the image
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center cursor-pointer">
                      <User className="max-w-xs max-h-xs rounded-full shadow-lg bg-transparent" />
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">
                {user.userName}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {user.userRole}
              </p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
