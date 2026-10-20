import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';

// 1. Creamos el contexto
const AuthContext = createContext();

// 2. Creamos el "Proveedor" (el que envuelve a toda la app)
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Para saber si estamos cargando la sesión inicial

    // Función para iniciar sesión
    const login = async (email, password) => {
        const data = await api('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        return data.user;
    };

    // Función para registrarse
    const register = async (name, email, password) => {
        const data = await api('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
        });
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        return data.user;
    };

    // Función para cerrar sesión
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    // Al cargar la página por primera vez, verificamos si hay sesión
    useEffect(() => {
        const checkSession = async () => {
            const token = localStorage.getItem('token');
            const savedUser = localStorage.getItem('user');

            if (token && savedUser) {
                // Si hay token, confiamos en el usuario guardado por ahora
                setUser(JSON.parse(savedUser));
                
                // Y en segundo plano preguntamos al backend si el token sigue vivo
                try {
                    const data = await api('/auth/me');
                    setUser(data.user);
                    localStorage.setItem('user', JSON.stringify(data.user));
                } catch (error) {
                    // Si el token expiró, el api/client.js ya lo va a desloguear
                    console.error('Sesión expirada');
                }
            }
            setLoading(false); // Terminó la carga inicial
        };

        checkSession();
    }, []); // El array vacío [] significa que esto corre solo una vez

    // 3. Lo que vamos a compartir con toda la app
    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user, // true si user no es null
        isAdmin: user?.role === 'admin', // true si el rol es admin
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// 4. Un Hook personalizado para usar el contexto más fácil
export const useAuth = () => {
    return useContext(AuthContext);
};