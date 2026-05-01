import { BACKEND_URL } from '../../config/backend.ts';
import { dasboardAdmin } from '../apiEndpoints.ts';

/**
 * Get admin dashboard data
 * @returns {Promise<Object>} Response with status, message, and data
 */
export const getAdminDashboard = async () => {
    try {
        const token = localStorage.getItem('access_token');
        
        const response = await fetch(`${BACKEND_URL}/${dasboardAdmin.adminDashboard}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Admin dashboard fetch error:', error);
        throw error;
    }
};

/**
 * Add a new coordinator
 * @param {string} name - Coordinator name
 * @param {string} email - Coordinator email
 * @returns {Promise<Object>} Response with status and message
 */
export const addCoordinator = async (name, email) => {
    try {
        const token = localStorage.getItem('access_token');
        
        const response = await fetch(`${BACKEND_URL}/${dasboardAdmin.addCoordinator}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: name,
                email: email
            })
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Add coordinator error:', error);
        throw error;
    }
};

/**
 * Get all coordinators for admin
 * @returns {Promise<Object>} Response with status, message, and data
 */
export const getCoordinators = async () => {
    try {
        const token = localStorage.getItem('access_token');
        
        const response = await fetch(`${BACKEND_URL}/${dasboardAdmin.getCoordinators}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Get coordinators error:', error);
        throw error;
    }
};

/**
 * Remove a coordinator
 * @param {string} email - Coordinator email to remove
 * @returns {Promise<Object>} Response with status and message
 */
export const removeCoordinator = async (email) => {
    try {
        const token = localStorage.getItem('access_token');
        
        const response = await fetch(`${BACKEND_URL}/${dasboardAdmin.removeCoordinator}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                email: email
            })
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Remove coordinator error:', error);
        throw error;
    }
};
