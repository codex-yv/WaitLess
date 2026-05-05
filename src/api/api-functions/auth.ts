import { BACKEND_URL } from '../../config/backend.ts';
import { authEndpoints } from '../apiEndpoints.ts';
import wsManager from '../websocket.ts';

/**
 * Login function for admin users
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} Response with message, status, access_token, token_type
 */
export const login = async (email, password) => {
    console.log("Login function called with:", { email, password });
    try {
        const response = await fetch(`${BACKEND_URL}/${authEndpoints.login}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();
        
        // Save token to localStorage if login is successful
        if (data.status && data.access_token) {
            localStorage.setItem('access_token', data.access_token);

            // Connect to WebSocket with the admin_id for real-time updates
            if (data.admin_id) {
                wsManager.connect(data.admin_id);
            }
        }
        
        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

/**
 * Signup function for new admin users
 * @param {string} name - User name
 * @param {string} email - User email
 * @param {string} picture - User picture
 * @param {string} password - User password
 * @param {string} phone - User phone number
 * @param {string} occupation - User occupation
 * @param {string} org_type - Organization type (optional)
 * @param {string} org_name - Organization name (optional)
 * @param {string} address - Organization address (optional)
 * @returns {Promise<Object>} Response with message, status, access_token, token_type
 */
export const signup = async (name: string, email: string, picture: string, password: string, phone: string, occupation: string, org_type: string | null = null, org_name: string | null = null, address: string | null = null) => {
    try {
        // console.log("Signup function called with:", { name, email, picture, password, phone, occupation, org_type, org_name, address });
        const response = await fetch(`${BACKEND_URL}/${authEndpoints.signup}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                picture: picture,
                password: password,
                phone: phone,
                occupation: occupation,
                org_type: org_type,
                org_name: org_name,
                address: address
            })
        });

        const data = await response.json();
        
        // Save token to localStorage if signup is successful
        if (data.status && data.access_token) {
            localStorage.setItem('access_token', data.access_token);

            // Connect to WebSocket with the admin_id for real-time updates
            if (data.admin_id) {
                wsManager.connect(data.admin_id);
            }
        }
        console.log(data)
        return data;
    } catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
};

/**
 * Login function for coordinators
 * @param {string} email - Coordinator email
 * @param {string} token - Coordinator token
 * @returns {Promise<Object>} Response with message, status, access_token, token_type
 */
export const coordinatorLogin = async (email, token) => {
    try {
        const response = await fetch(`${BACKEND_URL}/${authEndpoints.coordinatorSignup}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                token: token
            })
        });

        const data = await response.json();
        
        // Save token to localStorage if coordinator login is successful
        if (data.status && data.access_token) {
            localStorage.setItem('access_token', data.access_token);
        }
        
        return data;
    } catch (error) {
        console.error('Coordinator login error:', error);
        throw error;
    }
};

/**
 * Login function via Google Auth
 * @param {string} token - Google ID/Access token
 * @returns {Promise<Object>} Response with message, status, access_token, token_type
 */
export const googleLogin = async (token) => {
    try {
        const response = await fetch(`${BACKEND_URL}/${authEndpoints.googleLogin}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token
            })
        });

        const data = await response.json();
        
        // Save token to localStorage if login is successful
        if (data.status && data.access_token) {
            localStorage.setItem('access_token', data.access_token);

            // Connect to WebSocket with the admin_id for real-time updates
            if (data.admin_id) {
                wsManager.connect(data.admin_id);
            }
        }
        
        return data;
    } catch (error) {
        console.error('Google login error:', error);
        throw error;
    }
};

/**
 * Verify Google Auth for Signup
 * @param {string} token - Google ID/Access token
 * @returns {Promise<Object>} Response with message, status, exists, email, name
 */
export const googleVerify = async (token) => {
    try {
        const response = await fetch(`${BACKEND_URL}/${authEndpoints.googleVerify}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token
            })
        });

        return await response.json();
    } catch (error) {
        console.error('Google verify error:', error);
        throw error;
    }
};
