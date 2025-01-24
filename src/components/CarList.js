import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarDetails from './CarDetails';
import CarCompare from './CarCompare';
import './CarList.css';

function CarList() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [sortKey, setSortKey] = useState('price');
  const [sortDirection, setSortDirection] = useState('asc');
  const [compareCars, setCompareCars] = useState([]); // for storing selected cars to compare
  const [viewMode, setViewMode] = useState('list');   // 'list', 'detail', or 'compare'

  // Fetch and sort cars whenever sortKey or sortDirection changes
  useEffect(() => {
    axios
      .get(`https://dealership.naman.zip/cars/sort?key=${sortKey}&direction=${sortDirection}`)
      .then(response => {
        setCars(response.data);
      })
      .catch(error => console.error('Error fetching cars:', error));
  }, [sortKey, sortDirection]);

  const handleCarClick = (car) => {
    axios
      .get(`https://dealership.naman.zip/car/${car.id}`)
      .then(response => {
        setSelectedCar(response.data);
        setViewMode('detail');
      })
      .catch(error => console.error('Error fetching car details:', error));
  };

  // Separate handlers for changing sort key vs direction
  const handleSortKeyChange = (key) => {
    setSortKey(key);
  };

  const handleSortDirectionChange = (dir) => {
    setSortDirection(dir);
  };

  // Compare-related logic
  const handleCompareCheckboxChange = (car) => {
    // Toggle the car in the compareCars array
    const alreadyInCompare = compareCars.some(c => c.id === car.id);
    let updatedCompareCars;
    if (alreadyInCompare) {
      updatedCompareCars = compareCars.filter(c => c.id !== car.id);
    } else {
      updatedCompareCars = [...compareCars, car];
    }
    setCompareCars(updatedCompareCars);
  };

  const startCompare = () => {
    // Only trigger compare if we have at least 2 selected cars
    if (compareCars.length >= 2) {
      setViewMode('compare');
    }
  };

  const goBackToList = () => {
    setViewMode('list');
    setSelectedCar(null);
  };

  const goBackFromDetails = () => {
    setViewMode('list');
    setSelectedCar(null);
  };

  // Render logic
  if (viewMode === 'detail' && selectedCar) {
    return <CarDetails car={selectedCar} onBack={goBackFromDetails} />;
  }

  if (viewMode === 'compare' && compareCars.length >= 2) {
    return <CarCompare cars={compareCars} onBack={goBackToList} />;
  }

  // Default: list view
  return (
    <div className="car-list-container">

      {/* Top Menu Bar (centered) */}
      <div className="top-menu-bar">
        {/* SORT BY menu */}
        <div className="menu-item">
          <button className="hover-button">Sort By</button>
          <div className="hover-dropdown">
            <button onClick={() => handleSortKeyChange('make')}>
              {sortKey === 'make' ? '✓ ' : ''}Make
            </button>
            <button onClick={() => handleSortKeyChange('model')}>
              {sortKey === 'model' ? '✓ ' : ''}Model
            </button>
            <button onClick={() => handleSortKeyChange('year')}>
              {sortKey === 'year' ? '✓ ' : ''}Year
            </button>
            <button onClick={() => handleSortKeyChange('price')}>
              {sortKey === 'price' ? '✓ ' : ''}Price
            </button>
            <button onClick={() => handleSortKeyChange('mileage')}>
              {sortKey === 'mileage' ? '✓ ' : ''}Mileage
            </button>
            <button onClick={() => handleSortKeyChange('condition')}>
              {sortKey === 'condition' ? '✓ ' : ''}Condition
            </button>
            <button onClick={() => handleSortKeyChange('fuel_type')}>
              {sortKey === 'fuel_type' ? '✓ ' : ''}Fuel Type
            </button>
            <button onClick={() => handleSortKeyChange('transmission')}>
              {sortKey === 'transmission' ? '✓ ' : ''}Transmission
            </button>
            <button onClick={() => handleSortKeyChange('color')}>
              {sortKey === 'color' ? '✓ ' : ''}Color
            </button>
          </div>
        </div>

        {/* SORT DIRECTION menu */}
        <div className="menu-item">
          <button className="hover-button">Direction</button>
          <div className="hover-dropdown">
            <button onClick={() => handleSortDirectionChange('asc')}>
              {sortDirection === 'asc' ? '✓ ' : ''}Ascending
            </button>
            <button onClick={() => handleSortDirectionChange('desc')}>
              {sortDirection === 'desc' ? '✓ ' : ''}Descending
            </button>
          </div>
        </div>

        {/* COMPARE BUTTON */}
        <div className="menu-item">
          <button
            className="compare-button"
            onClick={startCompare}
            disabled={compareCars.length < 2 || compareCars.length > 3}
            title="Select 2 or 3 cars to compare"
          >
            Compare ({compareCars.length})
          </button>
        </div>
      </div>

      {/* CAR GRID LIST */}
      <div className="car-grid">
        {cars.map(car => {
          const isSelectedForCompare = compareCars.some(c => c.id === car.id);
          return (
            <div key={car.id} className="car-card">
              <div className="compare-checkbox">
                <input
                  type="checkbox"
                  checked={isSelectedForCompare}
                  onChange={() => handleCompareCheckboxChange(car)}
                />
              </div>
              <div
                className="car-card-content"
                onClick={() => handleCarClick(car)}
                role="button"
                tabIndex={0}
              >
                <img
                  src={car.image || 'https://via.placeholder.com/150'}
                  alt={`${car.make} ${car.model}`}
                  className="car-image"
                />
                <div className="car-info">
                  <h3>{car.make} {car.model}</h3>
                  <p>${car.price}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CarList;
