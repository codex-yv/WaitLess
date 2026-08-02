import { BACKEND_URL } from '../../config/backend.ts';
import { clientDashboard } from '../apiEndpoints.ts';

/**
 * Get client dashboard data (authentication required)
 * @returns {Promise<Object>} Response with message, status, your_spot, current_pos, skipped, cancelled
 */
export const getClientDashboard = async () => {
    try {
        const token = localStorage.getItem('client_access_token');
        // localStorage.removeItem('client_access_token');
        const response = await fetch(`${BACKEND_URL}/${clientDashboard.dashboard}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        // Remove token if 401 error
        if (response.status === 401) {
            localStorage.removeItem('client_access_token');
        }

        return data;
    } catch (error) {
        console.error('Client dashboard fetch error:', error);
        throw error;
    }
};

/**
 * Cancel client registration (authentication required)
 * @returns {Promise<Object>} Response with message, status
 */
export const cancelRegistration = async () => {
    try {
        const token = localStorage.getItem('client_access_token');
        const response = await fetch(`${BACKEND_URL}/${clientDashboard.cancel}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        // Remove token if 401 error
        if (response.status === 401) {
            localStorage.removeItem('client_access_token');
        }

        // Remove token on successful cancellation
        if (response.status === 200 && data.status) {
            localStorage.removeItem('client_access_token');
            localStorage.removeItem('client_id');
        }

        return data;
    } catch (error) {
        console.error('Cancel registration error:', error);
        throw error;
    }
};

/**
 * Mark registration as done/missed (authentication required)
 * @returns {Promise<Object>} Response with message, status
 */
export const doneMissed = async () => {
    try {
        const token = localStorage.getItem('client_access_token');
        const response = await fetch(`${BACKEND_URL}/${clientDashboard.doneMissed}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        // Remove token if 401 error
        if (response.status === 401) {
            localStorage.removeItem('client_access_token');
        }

        // Remove token on successful completion
        if (response.status === 200 && data.status) {
            localStorage.removeItem('client_access_token');
            localStorage.removeItem('client_id');
        }

        return data;
    } catch (error) {
        console.error('Done missed error:', error);
        throw error;
    }
};