import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarDetails from './CarDetails';
import './CarList.css';

function CarList() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [sortKey, setSortKey] = useState('price');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    // Fetch cars from the API
    axios.get(`https://dealership.naman.zip/cars/sort?key=${sortKey}&direction=${sortDirection}`)
      .then(response => {
        setCars(response.data);
      })
      .catch(error => console.error('Error fetching cars:', error));
  }, [sortKey, sortDirection]);

  const handleCarClick = (car) => {
    axios.get(`https://dealership.naman.zip/car/${car.id}`)
      .then(response => {
        setSelectedCar(response.data);
      })
      .catch(error => console.error('Error fetching car details:', error));
  };

  const handleSortKeyChange = (e) => {
    setSortKey(e.target.value);
  };

  const handleSortDirectionChange = (e) => {
    setSortDirection(e.target.value);
  };

  return (
    <div className="car-list-container">
      <div className="control-menu">
        <h2>Sort Options</h2>
        <div className="dropdown-container">
          <button className="dropdown-button">Sort Options</button>
          <div className="dropdown-content">
            <label>
              Sort by:
              <select value={sortKey} onChange={handleSortKeyChange} className="dropdown">
                <option value="make">Make</option>
                <option value="model">Model</option>
                <option value="year">Year</option>
                <option value="price">Price</option>
                <option value="mileage">Mileage</option>
                <option value="condition">Condition</option>
                <option value="fuel_type">Fuel Type</option>
                <option value="transmission">Transmission</option>
                <option value="color">Color</option>
              </select>
            </label>
            <label>
              Direction:
              <select value={sortDirection} onChange={handleSortDirectionChange} className="dropdown">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      {selectedCar ? (
        <CarDetails car={selectedCar} onBack={() => setSelectedCar(null)} />
      ) : (
        <div className="car-grid">
          {cars.map(car => (
            <div key={car.id} className="car-card" onClick={() => handleCarClick(car)}>
              <img src={car.image || 'https://via.placeholder.com/150'} alt={`${car.make} ${car.model}`} className="car-image" />
              <div className="car-info">
                <h3>{car.make} {car.model}</h3>
                <p>${car.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CarList;