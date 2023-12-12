import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1/admin',
});

// Function to refresh the access token
const refreshToken = async () => {
    // Implement logic to refresh the token
    const response = await axios.get(
        'http://localhost:8080/api/v1/admin/auth/refresh',
        { withCredentials: true },
    );

    // Store the new access token
    const newAccessToken = response.data.payload.accessToken;
    localStorage.setItem('auth_token', newAccessToken);

    return newAccessToken;
};

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        // Check if the access token is present
        const accessToken = localStorage.getItem('auth_token');
        if (accessToken) {
            // eslint-disable-next-line no-param-reassign
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response &&
            error.response.status === 401 &&
            error.response.data.isExpired
        ) {
            // Attempt to refresh the token
            try {
                const newAccessToken = await refreshToken();

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axios(originalRequest);
            } catch (refreshError) {
                return refreshError;
            }
        }

        return Promise.reject(error);
    },
);

export default api;
