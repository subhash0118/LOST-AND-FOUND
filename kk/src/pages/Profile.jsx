import { useState } from 'react';
const ProfilePage = () => {
    return (
      <div className="flex flex-col items-center bg-gray-100 min-h-screen py-8">
        {/* Profile Picture Section */}
        <div className="w-75 h-75 bg-black text-white rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white font-semibold">Profile Pic</span>
        </div>
        <h2 className="text-2xl font-bold mt-4 text-gray-800">Your Name</h2>
  
        {/* Profile Form */}
        <div className="mt-6 w-1/2 bg-white p-6 shadow-md rounded-lg">
          <form className="space-y-4">
            <div>
              <label className="block font-semibold text-gray-700">Name</label>
              <input type="text" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Enter your name" />
            </div>
            <div>
              <label className="block font-semibold text-gray-700">Roll Number</label>
              <input type="text" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Enter your roll number" />
            </div>
            <div>
              <label className="block font-semibold text-gray-700">Mobile Number</label>
              <input type="text" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Enter your mobile number" />
            </div>
            <div>
              <label className="block font-semibold text-gray-700">Year of Study</label>
              <input type="text" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Enter your year of study" />
            </div>
            <div>
              <label className="block font-semibold text-gray-700">Branch</label>
              <input type="text" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Enter your branch" />
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default ProfilePage;