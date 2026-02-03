import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Truck, Users, Map, FileText, Lock, LogOut, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const Sidebar = () => {
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
            const res = await axios.post('http://localhost:5000/api/settings/verify-lock', { password: lockPassword });
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
        <div className="h-screen w-64 bg-slate-900 text-white flex flex-col shadow-2xl relative">
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

            <nav className="flex-1 px-4 py-4 space-y-2">
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
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
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
        </div>
    );
};

export default Sidebar;
