import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarDetails from './CarDetails';

function CarList() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    // Fetch cars from the API
    axios.get('https://dealership.naman.zip/cars')
      .then(response => {
        // Sort cars by price (lowest to highest)
        const sortedCars = response.data.sort((a, b) => a.price - b.price);
        setCars(sortedCars);
      })
      .catch(error => console.error('Error fetching cars:', error));
  }, []);

  const handleCarClick = (car) => {
    setSelectedCar(car);
  };

  return (
    <div>
      {selectedCar ? (
        <CarDetails car={selectedCar} onBack={() => setSelectedCar(null)} />
      ) : (
        <div>
          <h2>Available Cars</h2>
          <ul>
            {cars.map(car => (
              <li key={car.id} onClick={() => handleCarClick(car)}>
                {car.make} {car.model} - ${car.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CarList;