"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    rollNumber: "",
    mobileNumber: "",
    yearOfStudy: "",
    branch: "",
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token")

      if (!token) {
        navigate("/login")
        return
      }

      try {
        const response = await axios.get("http://localhost:5000/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setUserData(response.data.user)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching user data:", error)
        setError("Failed to load profile data")
        setLoading(false)

        // If unauthorized, redirect to login
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token")
          navigate("/login")
        }
      }
    }

    fetchUserData()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
      return
    }

    try {
      await axios.put("http://localhost:5000/user/update-profile", userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setError("")
      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error)
      setError("Failed to update profile")
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center bg-[#D7D3BF] min-h-screen py-8">
      {/* Profile Picture Section */}
      <div className="w-24 h-24 bg-gray-200 text-black rounded-full flex items-center justify-center shadow-lg">
        <span className="text-black font-semibold">
          {userData.username ? userData.username.charAt(0).toUpperCase() : "U"}
        </span>
      </div>
      <h2 className="text-2xl font-bold mt-4 text-gray-800">{userData.username}</h2>
      <p className="text-gray-600">{userData.email}</p>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-2 px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition cursor-pointer"
      >
        Logout
      </button>

      {/* Profile Form */}
      <div className="mt-6 w-full max-w-md bg-[#ECEBDE] p-6 shadow-md rounded-lg">
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-semibold text-gray-700">Name</label>
            <input
              type="text"
              name="username"
              value={userData.username || ""}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email || ""}
              disabled
              className="w-full p-2 border rounded-md bg-gray-200"
            />
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Roll Number</label>
            <input
              type="text"
              name="rollNumber"
              value={userData.rollNumber || ""}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your roll number"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Mobile Number</label>
            <input
              type="text"
              name="mobileNumber"
              value={userData.mobileNumber || ""}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your mobile number"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Year of Study</label>
            <input
              type="text"
              name="yearOfStudy"
              value={userData.yearOfStudy || ""}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your year of study"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Branch</label>
            <input
              type="text"
              name="branch"
              value={userData.branch || ""}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your branch"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition cursor-pointer"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProfilePage

