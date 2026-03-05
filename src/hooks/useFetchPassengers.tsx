import { useState, useCallback } from 'react';

import type { Passenger } from '../types';
import type { RandomUserApiResponse, RandomApiUser } from '../types/randomUser';

export const useFetchPassengers = () => {
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPassengers = useCallback(async (count: number) => {
    try {
      setLoading(true);

      const response = await fetch(`https://randomuser.me/api/?results=${count}`);
      if (!response.ok) throw new Error('Failed to fetch passengers');

      const data: RandomUserApiResponse = await response.json();

      const mappedResults: Passenger[] = data.results.map((item: RandomApiUser) => ({
        id: item.login.uuid,
        name: `${item.name.first} ${item.name.last}`,
      }));

      setPassengers((prev: Passenger[]) => [...prev, ...mappedResults]);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    passengers,
    loading,
    error,
    fetchPassengers,
    setPassengers,
  };
};
