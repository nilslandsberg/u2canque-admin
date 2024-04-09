import axios from 'axios';

const API_URL = "https://u2canque-server.onrender.com/api/login";

const signup = (email, password) => {
  const signUpRequest = { 
    email: email,
    password: password,
  }
  return axios.post(API_URL + "signup", signUpRequest  
  )
 
};

const login = (data) => {
  const { email, password } = data;

  return axios.post(API_URL, {
    email: email,
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