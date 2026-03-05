import { useState, useEffect } from 'react';

import { PassengerCard } from '../components/PassengerCard';
import { useFetchPassengers } from '../hooks/useFetchPassengers';
import { normalizeName, validateName } from '../utils/passengerValidation';

import type { Passenger } from '../types';

export const PassengerList = () => {
  const [newName, setNewName] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const { passengers, loading, error, fetchPassengers, setPassengers } = useFetchPassengers();

  const handleAddPassenger = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Always run full validation on submit regardless of dirty state
    const submitError = validateName(newName);
    if (submitError) {
      setValidationError(submitError);
      setIsDirty(true);
      return;
    }

    const newPassenger: Passenger = {
      id: crypto.randomUUID(),
      name: newName.trim(),
    };

    setPassengers((prev: Passenger[]) => [newPassenger, ...prev]);
    setNewName('');
    setValidationError(null);
    setIsDirty(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const normalized = normalizeName(e.target.value);
    setNewName(normalized);

    // Only show inline errors once the field has been blurred at least once
    if (isDirty) {
      setValidationError(normalized.trim().length > 0 ? validateName(normalized) : null);
    }
  };

  // Show validation error only after the user leaves the field
  const handleBlur = () => {
    if (newName.trim().length === 0) {
      // Don't nag if they just tabbed through an empty field
      return;
    }
    setIsDirty(true);
    setValidationError(validateName(newName));
  };

  const handleShowMore = () => {
    fetchPassengers(5);
  };

  useEffect(() => {
    fetchPassengers(5);
  }, [fetchPassengers]);

  const isSubmitDisabled = !newName.trim() || !!validationError;

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
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`name-input ${validationError ? 'input-error' : ''}`}
              autoComplete="off"
              aria-invalid={!!validationError}
              aria-describedby={validationError ? 'name-error' : undefined}
            />
            {validationError && (
              <span id="name-error" className="error-text" role="alert">
                {validationError}
              </span>
            )}
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitDisabled}>
            Add Passenger
          </button>
        </form>
      </section>

      <section className="passenger-list-section" aria-labelledby="list-title">
        <div className="list-header">
          <h2 id="list-title">Current Passengers</h2>
          <span className="count-badge" aria-atomic="true">
            {passengers.length} Total
          </span>
        </div>

        <ul className="passenger-grid">
          {passengers.map((passenger) => (
            <PassengerCard key={passenger.id} passenger={passenger} />
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
