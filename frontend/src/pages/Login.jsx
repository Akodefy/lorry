import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Truck, ArrowRight, Lock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.msg || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-2xl">

                {/* Left Side - Form */}
                <div className="p-10 md:p-14 flex flex-col justify-center">
                    <div className="mb-10">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                                <Truck className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-slate-900">YoyoTransport</h1>
                        </div>
                        <p className="text-slate-500">Welcome back! Please login to your account.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
                                    placeholder="admin@yoyotransport.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                                <span className="text-slate-600">Remember me</span>
                            </label>
                            <a href="#" className="text-indigo-600 font-medium hover:text-indigo-700">Forgot password?</a>
                        </div>

                        <motion.button
                            whileHover={!isLoading ? { scale: 1.02 } : {}}
                            whileTap={!isLoading ? { scale: 0.98 } : {}}
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-indigo-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    Logging in...
                                </>
                            ) : (
                                <>
                                    Log In <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </motion.button>
                    </form>

                    <p className="mt-8 text-center text-sm text-slate-500">
                        Don't have an account? <a href="#" className="font-bold text-indigo-600 hover:text-indigo-700">Contact Admin</a>
                    </p>
                </div>

                {/* Right Side - Image/Decoration */}
                <div className="hidden md:block bg-indigo-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700"></div>
                    <div className="relative h-full flex items-center justify-center p-12 text-center text-white z-10">
                        <div>
                            <h2 className="text-4xl font-bold mb-6">Manage Your Fleet with Confidence</h2>
                            <p className="text-indigo-100 text-lg leading-relaxed mb-8">
                                Track lorries, manage drivers, and monitor trips in real-time. The ultimate solution for modern transport logistics.
                            </p>
                            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-left">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-xl">
                                        98%
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">On-Time Delivery</p>
                                        <p className="text-indigo-200 text-sm">Based on last month's performance</p>
                                    </div>
                                </div>
                                <div className="w-full bg-white/20 rounded-full h-2">
                                    <div className="bg-emerald-500 w-[98%] h-full rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Abstract Shapes */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2"></div>
                </div>
            </div>
        </div>
    );
};

export default Login;
