const USER_CACHE_KEY = 'happenin.savedUser';

export function getSavedUser() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(USER_CACHE_KEY);
}

export function setSavedUser(name: string) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(USER_CACHE_KEY, name);
}