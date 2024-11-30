import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Correct import

const UserProfileForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Correct initialization of navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userProfile = { name, email, dob, country_code: countryCode, phone_number: phoneNumber };

    try {
      setLoading(true); // Start loading
      const response = await axios.post('http://127.0.0.1:8000/submit-profile/', userProfile);

      console.log(response.data);

      // Save the profile data to localStorage
      localStorage.setItem('userProfile', JSON.stringify(response.data.data));

      // Redirect to the profile output page
      navigate('/profile-output'); // Ensure this navigation is called after successful submission
    } catch (error) {
      console.error('There was an error submitting the form', error);
      setError('There was an error submitting your profile. Please try again.');
    } finally {
      setLoading(false); // Stop loading after request completes
    }
  };

  // Styles for the form
  const styles = {
    form: {
      maxWidth: '500px',
      margin: '50px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f9f9f9',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: 'bold',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '16px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#007bff',
      color: '#fff',
      fontSize: '16px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    buttonDisabled: {
      backgroundColor: '#ccc',
      cursor: 'not-allowed',
    },
    error: {
      color: 'red',
      marginBottom: '16px',
      fontSize: '14px',
    },
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {error && <p style={styles.error}>{error}</p>} {/* Display error message if there's any error */}

      <div>
        <label style={styles.label}>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
      </div>

      <div>
        <label style={styles.label}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
      </div>

      <div>
        <label style={styles.label}>Date of Birth:</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
          style={styles.input}
        />
      </div>

      <div>
        <label style={styles.label}>Country Code:</label>
        <select
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          required
          style={styles.input}
        >
          <option value="+1">+1 (USA)</option>
          <option value="+91">+91 (India)</option>
          <option value="+44">+44 (UK)</option>
        </select>
      </div>

      <div>
        <label style={styles.label}>Phone Number:</label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          style={styles.input}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{ ...styles.button, ...(loading ? styles.buttonDisabled : {}) }}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default UserProfileForm;
