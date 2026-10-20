const API_URL = import.meta.env.VITE_API_URL;

export const api = async (endpoint, options = {}) => {
    // 1. Buscamos el token en el localStorage
    const token = localStorage.getItem('token');

    // 2. Armamos los headers
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    // Si hay token, lo agregamos al header Authorization
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // 3. Hacemos el fetch (igual que en vanilla JS)
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    // 4. Manejo de error 401 (Sesión expirada)
    if (response.status === 401 && endpoint !== '/auth/login') {
        // Si falla, limpiamos todo y recargamos la página para ir al login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login'; 
        return;
    }

    // 5. Manejo de errores normales (400, 403, 404, etc)
    if (!response.ok) {
        // Si el backend devuelve un JSON con { error: "..." }, lo leemos
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Error en la petición');
    }

    // 6. Si todo está bien (200, 201, etc.), devolvemos el JSON
    // Si es un 204 (No Content), no hay JSON que leer
    if (response.status === 204) return null;
    
    return response.json();
};