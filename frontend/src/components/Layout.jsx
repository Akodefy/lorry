import Sidebar from './Sidebar';
import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Layout = () => {
    const { user, loading } = useContext(AuthContext);

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
            <Sidebar />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-10">
                    <h2 className="text-xl font-semibold text-slate-800">Overview</h2>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                            AD
                        </div>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
