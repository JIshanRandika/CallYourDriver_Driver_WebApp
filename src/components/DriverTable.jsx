import React from 'react';

const DriverTable = ({ drivers, onToggleAvailability }) => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
          <th style={{ padding: '10px' }}>Park</th>
          <th style={{ padding: '10px' }}>Category</th>
          <th style={{ padding: '10px' }}>Availability</th>
          <th style={{ padding: '10px' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {drivers.map((driver) => (
          <tr key={driver.contactNumber} style={{ borderBottom: '1px solid #ddd' }}>
            <td style={{ padding: '10px', color: 'white' }}>{driver.parkName}</td>
            <td style={{ padding: '10px', color: 'white' }}>{driver.category}</td>
            <td style={{ padding: '10px', color: 'white', backgroundColor: driver.currentAvailability ? 'green' : 'red' }}>{driver.currentAvailability ? 'Available' : 'Unavailable'}</td>
            <td style={{ padding: '10px', color: 'white' }}>
              <button
                style={{
                  padding: '5px 10px',
                  backgroundColor: driver.currentAvailability ? '#f44336' : '#4caf50',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
                onClick={() => onToggleAvailability(driver._id, !driver.currentAvailability)}
              >
                {driver.currentAvailability ? 'Mark as Unavailable' : 'Mark as Available'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DriverTable;
