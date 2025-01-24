import React from 'react';

function CarDetails({ car, onBack }) {
  return (
    <div>
      <button onClick={onBack}>Back to List</button>
      <h2>{car.make} {car.model}</h2>
      <p><strong>Price:</strong> ${car.price}</p>
      <p><strong>Year:</strong> {car.year}</p>
      <p><strong>Mileage:</strong> {car.mileage} miles</p>
      <p><strong>Description:</strong> {car.description}</p>
    </div>
  );
}

export default CarDetails;

// Step 5: Add some basic styling
// File: src/App.css
