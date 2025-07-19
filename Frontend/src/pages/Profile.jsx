import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { USER_PATH } from "../constant";

const Profile = () => {
  const { userId } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Bidder');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [userId]);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword) {
      setMessage("Both fields are required");
      return;
    }

    try {
      const response = await axios.post(`${USER_PATH}/changePassword/${userId}`, {
        oldPassword,
        newPassword
      });

      setMessage(response.data);
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      setMessage("Incorrect old password");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-800">User Profile</h2>
      <div className="mt-4 space-y-4">
        <div className="flex items-center">
          <span className="font-semibold text-gray-700 w-24">Name:</span>
          <span className="text-gray-900">{name}</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-gray-700 w-24">Email:</span>
          <span className="text-gray-900">{email}</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-gray-700 w-24">Role:</span>
          <span className="text-blue-600 font-medium">{role}</span>
        </div>
      </div>

      {/* Change Password Section */}
      <h3 className="text-xl font-bold text-center text-gray-800 mt-6">Change Password</h3>
      <form className="mt-4 space-y-4" onSubmit={handleChangePassword}>
        <div>
          <label className="block text-gray-700">Old Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded-md"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">New Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded-md"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Change Password
        </button>
        {message && <p className="text-center text-blue-500 mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default Profile;
