import { BACKEND_URL } from '../../config/backend.ts';
import { homePage } from '../apiEndpoints.ts';

/**
 * Home page function to verify authentication
 * @returns {Promise<Object>} Response with status
 */
export const getHomeData = async () => {
    try {
        const token = localStorage.getItem('access_token');
        
        const response = await fetch(`${BACKEND_URL}/${homePage.home}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Home data fetch error:', error);
        throw error;
    }
};
