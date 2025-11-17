// FIX: Import `React` to make React types like `React.Dispatch` available.
import React, { useState, useEffect } from 'react';

export function useLocalStorage<T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
        try {
            const serializedValue = JSON.stringify(storedValue);
            window.localStorage.setItem(key, serializedValue);
        } catch (error) {
            console.log(`Error setting localStorage key “${key}”:`, error);
        }
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
