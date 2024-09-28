import React from 'react';

const SimpleTable = () => {
  // Example data for the table
  const data = [
    { name: 'John Doe', age: 28, city: 'New York' },
    { name: 'Jane Smith', age: 32, city: 'Los Angeles' },
    { name: 'Alice Johnson', age: 24, city: 'Chicago' },
    { name: 'Bob Brown', age: 45, city: 'Houston' }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.age}</td>
              <td>{row.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SimpleTable;
