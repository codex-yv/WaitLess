import { BACKEND_URL } from '../../config/backend.ts';

import { clientForm } from '../apiEndpoints.ts';



/**

 * Get form by scanning QR code (no authentication required)

 * @param {string} formId - Form ID from QR code

 * @returns {Promise<Object>} Response with message, error, data, and status

 */

export const scanQR = async (formId) => {

    try {
        const response = await fetch(`${BACKEND_URL}/${clientForm.scanQR}?form_id=${formId}`, {

            method: 'GET',

            headers: {

                'Content-Type': 'application/json'

            }

        });



        const data = await response.json();

        return data;

    } catch (error) {

        console.error('Scan QR error:', error);

        throw error;

    }

};



/**

 * Get existing form status (authentication required)

 * @returns {Promise<Object>} Response with message, status, your_spot, current_pos

 */

export const reScanQR = async () => {
    try {
        const token = localStorage.getItem('client_access_token');
        if (!token) {
            return { status: false, statusCode: 401, message: "Unauthorized" };
        }
        
        const response = await fetch(`${BACKEND_URL}/${clientForm.reScanQR}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 401) {
            return { status: false, statusCode: 401, message: "Unauthorized" };
        }

        const data = await response.json();
        return data;
    } catch (error) {

        console.error('Re-scan QR error:', error);

        throw error;

    }

};



/**

 * Submit client form (no authentication required, returns access token)

 * @param {string} formId - Form ID

 * @param {Array} paramsVal - List of parameter values

 * @returns {Promise<Object>} Response with message, error, status, access_token, token_type

 */

export const submitForm = async (formId, paramsVal) => {

    try {

        const response = await fetch(`${BACKEND_URL}/${clientForm.submitForm}`, {

            method: 'POST',

            headers: {

                'Content-Type': 'application/json'

            },

            body: JSON.stringify({

                form_id: formId,

                params_val: paramsVal

            })

        });



        const data = await response.json();

        

        // Save token to localStorage if submission is successful

        if (data.status && data.access_token) {

            localStorage.setItem('client_access_token', data.access_token);

            // Save client_id for WebSocket connection in ClientDash

            if (data.client_id) {

                localStorage.setItem('client_id', data.client_id);

            }

        }

        

        return data;

    } catch (error) {

        console.error('Submit form error:', error);

        throw error;

    }

};