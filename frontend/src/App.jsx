import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Importamos todas las páginas (aunque por ahora estén vacías)
import Home from './pages/Home';
import Products from './pages/Products';
import Login from './pages/Login';
import Register from './pages/Register';
import MyTickets from './pages/MyTickets';
import NewTicket from './pages/NewTicket';
import TicketDetail from './pages/TicketDetail';
import AdminTickets from './pages/AdminTickets';
import AdminUsers from './pages/AdminUsers';
import NotFound from './pages/NotFound';

const App = () => {
    return (
        <Routes>
            {/* Rutas Públicas (cualquiera puede verlas) */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rutas Protegidas (Requieren estar logueado) */}
            <Route element={<ProtectedRoute />}>
                <Route path="/tickets" element={<MyTickets />} />
                <Route path="/tickets/new" element={<NewTicket />} />
                <Route path="/tickets/:id" element={<TicketDetail />} />
            </Route>

            {/* Rutas de Admin (Requieren estar logueado Y ser admin) */}
            <Route element={<ProtectedRoute requireAdmin={true} />}>
                <Route path="/admin/tickets" element={<AdminTickets />} />
                <Route path="/admin/users" element={<AdminUsers />} />
            </Route>

            {/* Ruta para cualquier URL que no exista */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default App;