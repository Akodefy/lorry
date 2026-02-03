import Sidebar, { MobileSidebar } from './Sidebar';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { Menu } from 'lucide-react';

const Layout = () => {
    const { user, loading } = useContext(AuthContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="flex bg-slate-50 min-h-screen font-sans antialiased text-slate-900">
            {/* Desktop Sidebar */}
            <Sidebar />

            {/* Mobile Sidebar */}
            <MobileSidebar
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />

            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shadow-sm z-10">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <h2 className="text-xl font-semibold text-slate-800">Overview</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                            {user.name && user.name[0] ? user.name[0].toUpperCase() : 'U'}
                        </div>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50/50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
