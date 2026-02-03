import { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, ArrowRight, Lock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement actual login logic
        console.log('Login attempt', { email, password });
        navigate('/');
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
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20"
                        >
                            Log In <ArrowRight className="w-5 h-5" />
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
