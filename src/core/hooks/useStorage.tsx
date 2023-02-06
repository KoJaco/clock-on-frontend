import { useCallback, useEffect, useState } from 'react';

export const useLocalStorage = (key: string, value: unknown) =>
    useStorage(key, value, window.localStorage);

export const useSessionStorage = (key: string, value: unknown) => {
    return useStorage(key, value, window.sessionStorage);
};

export function useStorage(key: string, value: unknown, storage: Storage) {
    /**
     * Custom hook to handle localStorage.
     *
     * E.g: Persisting state in localStorage.
     */
    const [storageValue, setStorageValue] = useState(() => {
        const json = storage.getItem(key);

        if (json != null) return JSON.parse(json);

        if (typeof value === 'function') return value();

        return value;
    });

    useEffect(() => {
        if (storageValue === undefined) return storage.removeItem(key);
        storage.setItem(key, JSON.stringify(storageValue));
    }, [key, storageValue, storage]);

    const remove = useCallback(() => {
        setStorageValue(undefined);
    }, []);

    return [storageValue, setStorageValue, remove];
}
