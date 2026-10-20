import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Páginas
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
        <div className="flex flex-col min-h-screen bg-slate-100">
            <Navbar />
            
            {/* El main crece para empujar el footer abajo */}
            <main className="flex-grow container mx-auto p-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="/tickets" element={<MyTickets />} />
                        <Route path="/tickets/new" element={<NewTicket />} />
                        <Route path="/tickets/:id" element={<TicketDetail />} />
                    </Route>

                    <Route element={<ProtectedRoute requireAdmin={true} />}>
                        <Route path="/admin/tickets" element={<AdminTickets />} />
                        <Route path="/admin/users" element={<AdminUsers />} />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
};

export default App;