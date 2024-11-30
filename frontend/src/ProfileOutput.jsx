// ProfileOutput.js
import React, { useEffect, useState } from 'react';

const ProfileOutput = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Retrieve the profile data from localStorage
    const data = JSON.parse(localStorage.getItem('userProfile'));
    if (data) {
      setProfileData(data);
    }
  }, []);

  return (
    <div className="profile-output">
      <h2>User Profile</h2>
      {profileData ? (
        <div>
          <p><strong>Name:</strong> {profileData.name}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Date of Birth:</strong> {profileData.dob}</p>
          <p><strong>Country Code:</strong> {profileData.country_code}</p>
          <p><strong>Phone Number:</strong> {profileData.phone_number}</p>
        </div>
      ) : (
        <p>No data available. Please submit your profile first.</p>
      )}
    </div>
  );
};

export default ProfileOutput;
