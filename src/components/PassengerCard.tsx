import type { Passenger } from '../types';

export const PassengerCard = ({ passenger }: { passenger: Passenger }) => {
  return (
    <li className="passenger-item">
      <article className="passenger-card">
        <div className="passenger-avatar" aria-hidden="true">
          {passenger.name.charAt(0).toUpperCase()}
        </div>
        <h3 className="passenger-name">{passenger.name}</h3>
      </article>
    </li>
  );
};
