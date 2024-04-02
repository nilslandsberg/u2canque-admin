import axios from 'axios';

const API_URL = "https://u2canque-server.onrender.com/api/login";

const signup = (username, email, password) => {
  const signUpRequest = { 
    username: username,
    email: email,
    password: password,
  }
  return axios.post(API_URL + "signup", signUpRequest  
  )
 
};

const login = (email, password) => {
  return axios.post(API_URL + "login", {
    username: username,
    password: password
  })
  .then((response) => {
    const token = response.data.token
    const user = response.data.user
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify({ token, user }));
    }
    return response.data.user;
  });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("userReaders");
};

const authService = {
  signup,
  login,
  logout,
}

export default authService;