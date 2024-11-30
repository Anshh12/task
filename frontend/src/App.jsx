import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Updated imports
import UserProfileForm from './UserProfileForm';
import ProfileOutput from './ProfileOutput';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>User Profile Form</h1>
        <Routes>  {/* Use Routes instead of Switch */}
          <Route path="/" element={<UserProfileForm />} />  {/* Use element instead of component */}
          <Route path="/profile-output" element={<ProfileOutput />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
