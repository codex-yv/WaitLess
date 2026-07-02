import { BACKEND_URL } from '../../config/backend.ts';
import { adminForm } from '../apiEndpoints.ts';

/**
 * Get all forms for admin
 * @returns {Promise<Object>} Response with message, error, data, and status
 */
export const getForms = async () => {
    try {
        const token = localStorage.getItem('access_token');
        
        const response = await fetch(`${BACKEND_URL}/${adminForm.getForms}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Get forms error:', error);
        throw error;
    }
};

/**
 * Create a new form
 * @param {Array} formParams - List of form parameters (array of objects)
 * @param {string} title - Title of the form
 * @param {string} opensAt - Form opening time
 * @param {string} closesAt - Form closing time
 * @returns {Promise<Object>} Response with message, form_id, error, and status
 */
export const createForm = async (formParams, title, counter, opensAt, closesAt) => {
    try {
        const token = localStorage.getItem('access_token');
        
        const response = await fetch(`${BACKEND_URL}/${adminForm.createForm}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                form_params: formParams,
                title: title,
                counter: counter,
                opens_at: opensAt,
                closes_at: closesAt
            })
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Create form error:', error);
        throw error;
    }
};
