import React, { useState } from 'react';
import { Settings, Bell, Shield, CreditCard, Users, Building, Save } from 'lucide-react';

const SettingsManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      gymName: 'FitHub Gym',
      address: '123 Fitness Street, Health City, HC 12345',
      phone: '+1 (555) 123-4567',
      email: 'info@fithub.com',
      website: 'www.fithub.com',
      timezone: 'America/New_York',
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      membershipExpiry: true,
      paymentReminders: true,
      classReminders: true,
      systemAlerts: true,
    },
    membership: {
      basicMonthly: 50,
      premiumMonthly: 80,
      basicAnnual: 500,
      premiumAnnual: 800,
      registrationFee: 25,
      lateFee: 10,
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
      loginAttempts: 5,
    }
  });

  const tabs = [
    { id: 'general', label: 'General', icon: Building },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'membership', label: 'Membership', icon: Users },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  const handleSave = () => {
    // In a real app, this would save to the backend
    alert('Settings saved successfully!');
  };

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Gym Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gym Name</label>
            <input
              type="text"
              value={settings.general.gymName}
              onChange={(e) => updateSetting('general', 'gymName', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={settings.general.phone}
              onChange={(e) => updateSetting('general', 'phone', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={settings.general.email}
              onChange={(e) => updateSetting('general', 'email', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input
              type="url"
              value={settings.general.website}
              onChange={(e) => updateSetting('general', 'website', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <textarea
            value={settings.general.address}
            onChange={(e) => updateSetting('general', 'address', e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
          <select
            value={settings.general.timezone}
            onChange={(e) => updateSetting('general', 'timezone', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {Object.entries(settings.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="text-sm text-gray-600">
                  {key === 'emailNotifications' && 'Send notifications via email'}
                  {key === 'smsNotifications' && 'Send notifications via SMS'}
                  {key === 'membershipExpiry' && 'Alert when memberships are about to expire'}
                  {key === 'paymentReminders' && 'Send payment due reminders'}
                  {key === 'classReminders' && 'Send class schedule reminders'}
                  {key === 'systemAlerts' && 'Receive system maintenance alerts'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value as boolean}
                  onChange={(e) => updateSetting('notifications', key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMembershipSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Membership Pricing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Basic Monthly ($)</label>
            <input
              type="number"
              value={settings.membership.basicMonthly}
              onChange={(e) => updateSetting('membership', 'basicMonthly', parseFloat(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Premium Monthly ($)</label>
            <input
              type="number"
              value={settings.membership.premiumMonthly}
              onChange={(e) => updateSetting('membership', 'premiumMonthly', parseFloat(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Basic Annual ($)</label>
            <input
              type="number"
              value={settings.membership.basicAnnual}
              onChange={(e) => updateSetting('membership', 'basicAnnual', parseFloat(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Premium Annual ($)</label>
            <input
              type="number"
              value={settings.membership.premiumAnnual}
              onChange={(e) => updateSetting('membership', 'premiumAnnual', parseFloat(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Registration Fee ($)</label>
            <input
              type="number"
              value={settings.membership.registrationFee}
              onChange={(e) => updateSetting('membership', 'registrationFee', parseFloat(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Late Fee ($)</label>
            <input
              type="number"
              value={settings.membership.lateFee}
              onChange={(e) => updateSetting('membership', 'lateFee', parseFloat(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.security.twoFactorAuth}
                onChange={(e) => updateSetting('security', 'twoFactorAuth', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout (minutes)</label>
              <input
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password Expiry (days)</label>
              <input
                type="number"
                value={settings.security.passwordExpiry}
                onChange={(e) => updateSetting('security', 'passwordExpiry', parseInt(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Login Attempts</label>
              <input
                type="number"
                value={settings.security.loginAttempts}
                onChange={(e) => updateSetting('security', 'loginAttempts', parseInt(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'membership':
        return renderMembershipSettings();
      case 'security':
        return renderSecuritySettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your gym's configuration and preferences</p>
        </div>
        <button
          onClick={handleSave}
          className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-green-600 transition-all flex items-center space-x-2"
        >
          <Save className="w-5 h-5" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="lg:w-64">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsManagement;