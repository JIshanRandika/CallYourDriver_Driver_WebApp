import React, { useEffect, useState } from 'react';
import DriverTable from '../components/DriverTable';
import { getDriverDetails, toggleAvailability } from '../services/api';
import Header from "../components/Header";

const DriverDetailsPage = () => {
  // const [contactNumber, setContactNumber] = useState('');
  const [drivers, setDrivers] = useState([]);
  const contactNumber = localStorage.getItem('contactNumber');
  const driverName = localStorage.getItem('driverName');


  const fetchDriverDetails = async () => {
    try {
      const data = await getDriverDetails(contactNumber);
      setDrivers(data.drivers);
    } catch (error) {
      alert('Error fetching driver details. Please check the contact number.');
    }
  };

  useEffect(() => {
    if (contactNumber) { // Ensure contactNumber is available before fetching
      fetchDriverDetails();
    }
  }, [contactNumber]); // Re-run when contactNumber changes

  const handleToggleAvailability = async (_id, currentAvailability) => {
    try {
      await toggleAvailability(_id, currentAvailability);
      window.location.reload();
      // setDrivers((prevDrivers) =>
      //   prevDrivers.map((driver) =>
      //     driver.contactNumber === contactNumber ? { ...driver, isAvailable } : driver
      //   )
      // );
    } catch (error) {
      alert('Error toggling availability.');
    }
  };

  return (
    <div>
      <Header />
      <div style={{ padding: '20px' }}>
      <h1 style={{color: 'white'}}>Hi {driverName}</h1>
      {/* <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          style={{
            padding: '10px',
            marginRight: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        />
        <button
          onClick={fetchDriverDetails}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4caf50',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Fetch Details
        </button>
      </div> */}
      {drivers.length > 0 && (
        <DriverTable drivers={drivers} onToggleAvailability={handleToggleAvailability} />
      )}
    </div>
    </div>
    
  );
};

export default DriverDetailsPage;
