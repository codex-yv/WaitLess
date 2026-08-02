import { BACKEND_URL } from '../../config/backend.ts';
import { adminTrackingEndpoints } from '../apiEndpoints.ts';

/**
 * Get live tracking data for a specific form
 * @param {string} formId - The ID of the form to get tracking data for
 * @returns {Promise<Object>} Response with message, status, and data (list of submissions)
 */
export const getLiveTracking = async (formId) => {
    try {
        const token = localStorage.getItem('access_token');
        
        let response = await fetch(`${BACKEND_URL}/${adminTrackingEndpoints.liveTracking}?form_id=${formId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        // Fallback: try with trailing slash if status 404
        if (response.status === 404) {
            const altEndpoint = adminTrackingEndpoints.liveTracking.endsWith('/') 
                ? adminTrackingEndpoints.liveTracking.slice(0, -1) 
                : `${adminTrackingEndpoints.liveTracking}/`;
            response = await fetch(`${BACKEND_URL}/${altEndpoint}?form_id=${formId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Get live tracking error:', error);
        throw error;
    }
};

/**
 * Mark the next customer as served
 * @param {string} formId - The ID of the form
 * @param {string} clientId - The ID of the client to serve
 * @returns {Promise<Object>} Response with message and status
 */
export const nextCustomer = async (formId, clientId) => {
    try {
        const token = localStorage.getItem('access_token');
        
        const response = await fetch(`${BACKEND_URL}/${adminTrackingEndpoints.nextCustomer}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                form_id: formId,
                client_id: clientId
            })
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Next customer error:', error);
        throw error;
    }
};

/**
 * Skip a customer
 * @param {string} formId - The ID of the form
 * @param {string} clientId - The ID of the client to skip
 * @returns {Promise<Object>} Response with message and status
 */
export const skipCustomer = async (formId, clientId) => {
    try {
        const token = localStorage.getItem('access_token');
        
        const response = await fetch(`${BACKEND_URL}/${adminTrackingEndpoints.skipCustomer}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                form_id: formId,
                client_id: clientId
            })
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Skip customer error:', error);
        throw error;
    }
};

/**
 * Cancel a customer
 * @param {string} formId - The ID of the form
 * @param {string} clientId - The ID of the client to cancel
 * @returns {Promise<Object>} Response with message and status
 */
export const cancelCustomer = async (formId, clientId) => {
    try {
        const token = localStorage.getItem('access_token');
        
        const response = await fetch(`${BACKEND_URL}/${adminTrackingEndpoints.cancelCustomer}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                form_id: formId,
                client_id: clientId
            })
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Cancel customer error:', error);
        throw error;
    }
};
