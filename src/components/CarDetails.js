import React from 'react';
import './CarDetails.css';

function CarDetails({ car, onBack }) {
  return (
    <div className="car-details">
      <button onClick={onBack} className="back-button">Back to List</button>
      <div className="details-header">
        <img
          src={car.image || 'https://via.placeholder.com/300'}
          alt={`${car.make} ${car.model}`}
          className="details-image"
        />
        <div className="details-info">
          <div className="details-info-row">
            <p><strong>Make:</strong> {car.make}</p>
            <p><strong>Model:</strong> {car.model}</p>
          </div>
          <div className="details-info-row">
            <p><strong>Year:</strong> {car.year}</p>
            <p><strong>Price:</strong> ${car.price}</p>
          </div>
          <div className="details-info-row">
            <p><strong>Condition:</strong> {car.condition}</p>
            <p><strong>Mileage:</strong> {car.mileage} miles</p>
          </div>
          <div className="details-info-row">
            <p><strong>Fuel Type:</strong> {car.fuel_type}</p>
            <p><strong>Transmission:</strong> {car.transmission}</p>
          </div>
          <div className="details-info-row">
            <p><strong>Color:</strong> {car.color}</p>
          </div>
        </div>
      </div>
      <div className="details-description">
        <h3>Description</h3>
        <p>{car.description || 'No description available.'}</p>
      </div>
    </div>
  );
}

export default CarDetails;
