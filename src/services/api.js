import axios from 'axios';

// Configure the base URL for the API
const api = axios.create({
  baseURL: 'https://call-your-driver-backend.vercel.app/api',
  // baseURL: 'http://127.0.0.1:5000/api', 
});

// Attach a request interceptor to include the token in the Authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// API calls
export const login = async (username, password) => {
  const formatContactNumber = async (phoneNumber) => {
    // Simulating an asynchronous operation
    return new Promise((resolve) => {
      setTimeout(() => {
        const cleanNumber = phoneNumber.replace(/\D/g, '');
        if (cleanNumber.startsWith('94')) {
          resolve(`+${cleanNumber}`);
        } else if (cleanNumber.startsWith('0')) {
          resolve(`+94${cleanNumber.slice(1)}`);
        } else {
          resolve(`+94${cleanNumber}`);
        }
      }, 100); // Simulated delay
    });
  };

  try {
    console.log('Sending login request:', { username, password });
    const { data } = await api.post('/users/login', { username, password });
    
    // Wait for formatContactNumber to complete
    const formattedContactNumber = await formatContactNumber(data.contactNumber);
    
    console.log("formattedContactNumber");
    console.log(formattedContactNumber);
    console.log('Received response:', data);
    
    localStorage.setItem('token', data.token);
    localStorage.setItem('contactNumber', formattedContactNumber);
    localStorage.setItem('driverName', data.name);
    
    return data;
  } catch (error) {
    console.error('Error in login API call:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Unable to login.');
  }
};


export const register = async (name, username, password, contactNumber) => {
  return api.post('/users/register', { name, username, password, contactNumber });
};

export const suggestDriver = async (parkName, category) => {
  return api.post('/drivers/suggest', { parkName, category });
};

export const logout = async () => {
  localStorage.removeItem('token');
};

export const deductPoints = async (contactNumber) => {
  return api.post('/drivers/deductPoints', { contactNumber });
};

export const getParks = async () => api.get('/parks');
export const getCategories = async () => api.get('/categories');

export const resetPassword = async (username, newPassword) => {
  return api.post('/users/reset-password', { username, newPassword });
};

// Fetch driver details by contact number
export const getDriverDetails = async (contactNumber) => {
  const { data } = await api.post('/drivers/details', { contactNumber });
  return data;
};

// Toggle driver availability
export const toggleAvailability = async (_id, currentAvailability) => {
  await api.post('/drivers/toggle-availability', { _id, currentAvailability });
};
