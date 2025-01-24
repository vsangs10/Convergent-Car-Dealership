import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CarCompare.css';

function CarCompare({ cars, onBack }) {
  // We'll store the "detailed" versions of each selected car here.
  const [detailedCars, setDetailedCars] = useState([]);

  useEffect(() => {
    async function fetchCarDetails() {
      try {
        const carDetailsPromises = cars.map(async (car) => {
          // If we already have full info (check if car.description?), skip fetch
          if (car.description) {
            return car;
          }
          // Otherwise, fetch the full info from the API
          const response = await axios.get(`https://dealership.naman.zip/car/${car.id}`);
          return response.data;
        });
        const allDetails = await Promise.all(carDetailsPromises);
        setDetailedCars(allDetails);
      } catch (err) {
        console.error('Error fetching car details for compare:', err);
      }
    }
    fetchCarDetails();
  }, [cars]);

  return (
    <div className="compare-container">
      <button onClick={onBack} className="back-button">Back to List</button>
      <h2>Compare Cars</h2>
      
      <div className="compare-grid">
        {detailedCars.map((car) => (
          <div key={car.id} className="compare-column">
            <img
              src={car.image || 'https://via.placeholder.com/300'}
              alt={`${car.make} ${car.model}`}
              className="compare-image"
            />
            <h3>{car.make} {car.model} ({car.year})</h3>
            <p><strong>Price:</strong> ${car.price}</p>
            <p><strong>Condition:</strong> {car.condition}</p>
            <p><strong>Mileage:</strong> {car.mileage} miles</p>
            <p><strong>Fuel Type:</strong> {car.fuel_type}</p>
            <p><strong>Transmission:</strong> {car.transmission}</p>
            <p><strong>Color:</strong> {car.color}</p>
            <p><strong>Description:</strong> {car.description || 'No description available.'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarCompare;
