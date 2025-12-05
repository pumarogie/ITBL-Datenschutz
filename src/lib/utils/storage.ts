export const isLocalStorageAvailable = (): boolean => {
  return typeof window !== "undefined" && !!window.localStorage;
};

export const getLocalStorageItem = (key: string): string | null => {
  if (!isLocalStorageAvailable()) {
    return null;
  }
  return window.localStorage.getItem(key);
};

export const setLocalStorageItem = (key: string, value: string): void => {
  if (!isLocalStorageAvailable()) {
    return;
  }
  window.localStorage.setItem(key, value);
};

export const removeLocalStorageItem = (key: string): void => {
  if (!isLocalStorageAvailable()) {
    return;
  }
  window.localStorage.removeItem(key);
};

export const clearLocalStorage = (): void => {
  if (!isLocalStorageAvailable()) {
    return;
  }
  window.localStorage.clear();
};
