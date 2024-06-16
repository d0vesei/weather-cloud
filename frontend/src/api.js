import axios from 'axios';

const API_BASE_URL = 'https://localhost:7297/api/weatherdatum';

export const fetchWeatherData = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return [];
    }
};

export const fetchWeatherDetail = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching weather detail:', error);
        return null;
    }
};
