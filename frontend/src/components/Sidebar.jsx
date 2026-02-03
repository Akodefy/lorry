import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Truck, Users, Map, FileText, Lock, LogOut, Wrench, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContext, useState } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const SidebarContent = () => {
    const location = useLocation();
    const { logout } = useContext(AuthContext);

    const menuItems = [
        { title: 'Dashboard', icon: LayoutDashboard, path: '/' },
        { title: 'Lorries', icon: Truck, path: '/lorries' },
        { title: 'Drivers', icon: Users, path: '/drivers' },
        { title: 'Trips', icon: Map, path: '/trips' },
        { title: 'Maintenance', icon: Wrench, path: '/maintenance' },
        { title: 'Reports', icon: FileText, path: '/reports' },
    ];

    const [isLockModalOpen, setIsLockModalOpen] = useState(false);
    const [lockPassword, setLockPassword] = useState('');
    const navigate = useNavigate();

    const handleUnlock = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/settings/verify-lock`, { password: lockPassword });
            if (res.data.success) {
                setIsLockModalOpen(false);
                setLockPassword('');
                navigate('/audit-logs');
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Verification failed');
        }
    };

    return (
        <>
            <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                        <Truck className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-xl font-bold tracking-wide">Yoyo</h1>
                </div>
                <button
                    onClick={() => setIsLockModalOpen(true)}
                    className="text-slate-500 hover:text-white transition-colors"
                >
                    <Lock className="w-5 h-5" />
                </button>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link to={item.path} key={item.path}>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                    ? 'bg-indigo-600 shadow-lg shadow-indigo-600/30 text-white'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.title}</span>
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:bg-slate-800 hover:text-red-400 rounded-xl transition-all"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>

            {/* Lock Modal */}
            {isLockModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 text-slate-800">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Lock className="w-5 h-5 text-indigo-600" />
                            Admin Access Required
                        </h3>
                        <form onSubmit={handleUnlock} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Enter Password</label>
                                <input
                                    type="password"
                                    autoFocus
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={lockPassword}
                                    onChange={(e) => setLockPassword(e.target.value)}
                                    placeholder="••••••••"
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => { setIsLockModalOpen(false); setLockPassword(''); }}
                                    className="px-4 py-2 text-slate-600 hover:bg-slate-50 border rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                >
                                    Unlock
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

const Sidebar = () => {
    return (
        <div className="hidden md:flex h-screen w-64 bg-slate-900 text-white flex-col shadow-2xl relative">
            <SidebarContent />
        </div>
    );
};

export const MobileSidebar = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                        className="fixed inset-y-0 left-0 w-64 bg-slate-900 text-white z-50 md:hidden flex flex-col shadow-2xl"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <SidebarContent />
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Sidebar;
