import { useState, useEffect } from 'react';

import { Passenger } from '../components/Passenger';
import { useFetchPassengers } from '../hooks/useFetchPassengers';

import type { PassengerData } from '../types';

export const PassengerList = () => {
  const [newName, setNewName] = useState<string>('');
  const [filter, setFilter] = useState<string>('');

  const { passengers, loading, error, fetchPassengers, setPassengers } = useFetchPassengers();

  const handleAddPassenger = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newName.trim()) return;

    const newPassenger: PassengerData = {
      id: crypto.randomUUID(),
      name: newName.trim(),
    };

    setPassengers((prev: PassengerData[]) => [newPassenger, ...prev]);
    setNewName('');
  };

  const handleShowMore = () => {
    fetchPassengers(5);
  };

  useEffect(() => {
    fetchPassengers(5);
  }, [fetchPassengers]);

  const filteredPassengers = passengers.filter((passenger) =>
    passenger.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <main className="app-content">
      <section className="add-passenger-section" aria-labelledby="add-title">
        <h2 id="add-title" className="visually-hidden">
          Add New Passenger
        </h2>

        <form onSubmit={handleAddPassenger} className="add-passenger-form">
          <div className="input-group">
            <label htmlFor="passenger-name" className="visually-hidden">
              Passenger Name
            </label>
            <input
              id="passenger-name"
              type="text"
              placeholder="Enter passenger name..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="name-input"
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={!newName.trim()}>
            Add Passenger
          </button>
        </form>
      </section>

      <section>
        <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />
      </section>

      <section className="passenger-list-section" aria-labelledby="list-title">
        <div className="list-header">
          <h2 id="list-title">Current Passengers</h2>
          <span className="count-badge" aria-atomic="true">
            {passengers.length} Total
          </span>
        </div>

        <ul className="passenger-grid">
          {filteredPassengers.map((passenger) => (
            <Passenger key={passenger.id} passenger={passenger} />
          ))}
        </ul>

        <div aria-live="polite" className="status-region">
          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}
        </div>

        <div className="actions-section">
          <button
            type="button"
            onClick={handleShowMore}
            className="show-more-btn"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? 'Loading...' : 'Show More'}
          </button>
        </div>
      </section>
    </main>
  );
};
