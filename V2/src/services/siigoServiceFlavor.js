const axios = require('axios');

const SIIGO_AUTH_URL = 'https://api.siigo.com/auth';
const SIIGO_PRODUCTS_URL = 'https://api.siigo.com/v1/products';
const USERNAME = 'COMERCIAL@PERLAS-EXPLOSIVAS.COM';
const ACCESS_KEY = 'ODVjN2RlNDItY2I3MS00MmI5LWFiNjItMWM5MDkyZTFjMzY5Oih7IzdDMmU+RVk=';
let accessToken = null;
let tokenExpiration = null; // Variable para controlar la expiración del token

// Función para autenticar y obtener el token
async function authenticate() {
    try {
        const response = await axios.post(SIIGO_AUTH_URL, {
            username: USERNAME,
            access_key: ACCESS_KEY
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Partner-Id': 'TuAplicacionNodeJS'
            }
        });

        accessToken = response.data.access_token;
        tokenExpiration = Date.now() + response.data.expires_in * 1000; // Calcular la expiración del token
        console.log('Autenticación exitosa. Token:', accessToken);
        return accessToken;
    } catch (error) {
        console.error('Error al autenticar:', error.response ? error.response.data : error.message);
        throw new Error('No se pudo autenticar con la API de Siigo');
    }
}

// Función para verificar si el token ha expirado y reautenticar si es necesario
async function ensureAuthenticated() {
    if (!accessToken || Date.now() >= tokenExpiration) {
        console.log('El token ha expirado o no existe. Reautenticando...');
        await authenticate();
    }
}

// Función para obtener productos con paginación (reutilizable)
async function getProducts(page, pageSize) {
    try {
        await ensureAuthenticated(); // Verificar y reautenticar si es necesario

        const response = await axios.get(`${SIIGO_PRODUCTS_URL}?page=${page}&page_size=${pageSize}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Partner-Id': 'TuAplicacionNodeJS'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error al obtener productos:', error.response ? error.response.data : error.message);
        throw new Error('No se pudo obtener el listado de productos');
    }
}

// Función para obtener todos los productos con paginación
async function getAllProducts() {
    try {
        await ensureAuthenticated(); // Verificar y reautenticar si es necesario

        let allProducts = [];
        let currentPage = 1;
        let hasMorePages = true;

        while (hasMorePages) {
            const response = await axios.get(`${SIIGO_PRODUCTS_URL}?page=${currentPage}&page_size=100`, {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });

            allProducts = allProducts.concat(response.data.results);
            currentPage++;
            hasMorePages = response.data.pagination && response.data.pagination.next_page;
        }

        return allProducts;
    } catch (error) {
        console.error('Error al obtener productos:', error.message);
        throw new Error('No se pudo obtener el listado de productos.');
    }
}

module.exports = { getProducts, getAllProducts };
