import React, { useState } from "react";

const AdminSettings = () => {
  // State for form inputs
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@example.com",
    phone: "+1234567890",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [theme, setTheme] = useState("light");

  const [apiKey, setApiKey] = useState("sk_test_4eC39HqLyjWDarjtT1zdp7dc");
  const [activityLogs, setActivityLogs] = useState([
    { id: 1, action: "Logged in", timestamp: "2023-10-01 10:00 AM" },
    { id: 2, action: "Updated profile", timestamp: "2023-10-02 11:30 AM" },
    { id: 3, action: "Changed password", timestamp: "2023-10-03 09:15 AM" },
  ]);

  const [exportData, setExportData] = useState({
    format: "JSON",
    includeLogs: true,
  });

  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", permissions: ["read", "write", "delete"] },
    { id: 2, name: "Editor", permissions: ["read", "write"] },
    { id: 3, name: "Viewer", permissions: ["read"] },
  ]);

  // Handle form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications({ ...notifications, [name]: checked });
  };

  const handleSecurityChange = (e) => {
    const { name, value, checked } = e.target;
    setSecurity({ ...security, [name]: value || checked });
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleExportChange = (e) => {
    const { name, value, checked } = e.target;
    setExportData({ ...exportData, [name]: value || checked });
  };

  const handleRoleChange = (roleId, permission) => {
    const updatedRoles = roles.map((role) =>
      role.id === roleId
        ? {
            ...role,
            permissions: role.permissions.includes(permission)
              ? role.permissions.filter((p) => p !== permission)
              : [...role.permissions, permission],
          }
        : role
    );
    setRoles(updatedRoles);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings updated successfully!");
  };

  // Generate new API key
  const generateApiKey = () => {
    const newKey = `sk_test_${Math.random().toString(36).substring(2, 15)}`;
    setApiKey(newKey);
    alert("New API key generated!");
  };

  // Export data
  const handleExportData = () => {
    alert(`Data exported in ${exportData.format} format!`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Admin Settings</h2>

      {/* Profile Settings */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Profile Settings</h3>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </form>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Notification Preferences</h3>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={notifications.emailNotifications}
                onChange={handleNotificationChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Email Notifications
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="pushNotifications"
                checked={notifications.pushNotifications}
                onChange={handleNotificationChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Push Notifications
              </label>
            </div>
          </div>
        </form>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Security Settings</h3>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="twoFactorAuth"
                checked={security.twoFactorAuth}
                onChange={handleSecurityChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Enable Two-Factor Authentication
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                name="password"
                value={security.password}
                onChange={handleSecurityChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={security.newPassword}
                onChange={handleSecurityChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={security.confirmPassword}
                onChange={handleSecurityChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </form>
      </div>

      {/* API Key Management */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">API Key Management</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              API Key
            </label>
            <input
              type="text"
              value={apiKey}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={generateApiKey}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Generate New API Key
          </button>
        </div>
      </div>

      {/* Activity Logs */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Activity Logs</h3>
        <div className="space-y-2">
          {activityLogs.map((log) => (
            <div
              key={log.id}
              className="flex justify-between items-center p-3 border border-gray-200 rounded-md"
            >
              <span className="text-sm text-gray-700">{log.action}</span>
              <span className="text-sm text-gray-500">{log.timestamp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Data Export */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Data Export</h3>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Export Format
              </label>
              <select
                name="format"
                value={exportData.format}
                onChange={handleExportChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="JSON">JSON</option>
                <option value="CSV">CSV</option>
                <option value="XML">XML</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="includeLogs"
                checked={exportData.includeLogs}
                onChange={handleExportChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Include Activity Logs
              </label>
            </div>
            <button
              onClick={handleExportData}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Export Data
            </button>
          </div>
        </form>
      </div>

      {/* Role-Based Access Control */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Role Management</h3>
        <div className="space-y-4">
          {roles.map((role) => (
            <div key={role.id} className="border border-gray-200 rounded-md p-4">
              <h4 className="text-lg font-semibold mb-2">{role.name}</h4>
              <div className="space-y-2">
                {["read", "write", "delete"].map((permission) => (
                  <div key={permission} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={role.permissions.includes(permission)}
                      onChange={() => handleRoleChange(role.id, permission)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                      {permission}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;