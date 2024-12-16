export const checkOnlineStatus = () => {
  return new Promise((resolve) => {
    if (typeof navigator.onLine !== 'undefined') {
      resolve(navigator.onLine);
    } else {
      // fallback for older browsers
      fetch('/favicon.ico')
        .then(() => resolve(true))
        .catch(() => resolve(false));
    }
  });
};

export const setupOfflineListener = (callback) => {
  window.addEventListener('online', () => callback(true));
  window.addEventListener('offline', () => callback(false));
}; 