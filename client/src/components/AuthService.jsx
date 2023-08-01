const TOKEN_KEY = "jwtToken";

const AuthService = {
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },
  setToken: (token) => {
    localStorage.setItem(TOKEN_KEY, token);
  },
  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
  },
  isAuthenticated: () => {
    // Check if the user is authenticated based on the token
    const token = AuthService.getToken();
    return !!token; // Return true if the token exists
  },
};

export default AuthService;
