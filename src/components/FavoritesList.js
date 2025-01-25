import React from 'react';
import './CarList.css'; 

function FavoritesList({ favorites, onCarClick, onFavoriteClick, onBack }) {
  return (
    <div className="car-list-container">
      <button onClick={onBack} className="back-button">Back to List</button>
      <h2>Your Favorites</h2>
      {favorites.length === 0 ? (
        <p>You have no favorite cars.</p>
      ) : (
        <div className="car-grid">
          {favorites.map((car) => {
            return (
              <div key={car.id} className="car-card">
                {}
                <div
                  className="favorite-icon"
                  onClick={(e) => onFavoriteClick(car, e)}
                  title="Remove from Favorites"
                >
                  {}
                  {'❤️'}
                </div>

                {}
                <div
                  className="car-card-content"
                  onClick={() => onCarClick(car)}
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
      )}
    </div>
  );
}

export default FavoritesList;
