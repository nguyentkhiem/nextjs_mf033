const TokenService = {
  getItemLocalStorage(key: string) {
    const accessToken = localStorage.getItem(key);
    return accessToken;
  },
  setItemLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  },
  removeItemLocalStorage(key: string) {
    localStorage.removeItem(key);
  },
};

export default TokenService;
