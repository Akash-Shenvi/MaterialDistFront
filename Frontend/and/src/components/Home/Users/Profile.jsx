import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const UserProfile = () => {
  const [user, setUser] = useState({
    and_id: "",
    name: "",
    USN: "",
    email: "",
    user_type: "",
    branch: "",
    phone_no: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://192.168.124.138:5000/get_user", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching user data:", err));
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://192.168.124.138:5000/update_user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const result = await response.json();
      alert(result.message || "Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://192.168.124.138:5000/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        localStorage.removeItem("authToken");
        navigate("/login");
      } else {
        console.error("Logout failed");
        alert("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Error logging out");
    }
  };

  return (
    <Layout>
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-orange-400 mb-6 text-center">User Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400">Name</label>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-orange-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400">USN</label>
                <input
                  type="text"
                  name="USN"
                  value={user.USN}
                  className="w-full p-2 rounded bg-gray-700 text-gray-400 cursor-not-allowed"
                  readOnly
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                className="w-full p-2 rounded bg-gray-700 text-gray-400 cursor-not-allowed"
                readOnly
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400">User Type</label>
                <input
                  type="text"
                  name="user_type"
                  value={user.user_type}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-orange-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400">Branch</label>
                <input
                  type="text"
                  name="branch"
                  value={user.branch}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-orange-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400">Phone Number</label>
              <input
                type="text"
                name="phone_no"
                value={user.phone_no}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 transition duration-300 p-2 rounded text-white font-bold shadow-md"
            >
              Update Profile
            </button>

            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 transition duration-300 p-2 rounded text-white font-bold shadow-md mt-2"
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
