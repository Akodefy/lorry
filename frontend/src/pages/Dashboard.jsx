import { useState, useEffect } from 'react';
import axios from 'axios';
import { Truck, Users, Map, DollarSign, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start justify-between"
    >
        <div>
            <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
            {trend && (
                <p className={`text-xs font-medium mt-2 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {trend > 0 ? '+' : ''}{trend}% from last month
                </p>
            )}
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
            <Icon className="w-6 h-6 text-white" />
        </div>
    </motion.div>
);

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalLorries: 0,
        activeTrips: 0,
        totalDrivers: 0,
        monthlyRevenue: 0
    });
    const [alerts, setAlerts] = useState([]);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statsRes, alertsRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/dashboard/stats'),
                    axios.get('http://localhost:5000/api/dashboard/alerts')
                ]);
                setStats(statsRes.data);
                setAlerts(alertsRes.data);

                // Use fetched chart data
                if (statsRes.data.revenueChart) {
                    setChartData(statsRes.data.revenueChart);
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };
        fetchDashboardData();
    }, []);

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Lorries" value={stats.totalLorries} icon={Truck} color="bg-blue-500" />
                <StatCard title="Active Trips" value={stats.activeTrips} icon={Map} color="bg-indigo-500" />
                <StatCard title="Total Drivers" value={stats.totalDrivers} icon={Users} color="bg-purple-500" />
                <StatCard title="Monthly Revenue" value={`₹${stats.monthlyRevenue.toLocaleString()}`} icon={DollarSign} color="bg-emerald-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Revenue Overview</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                                <Tooltip />
                                <Area type="monotone" dataKey="income" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Expiry Alerts</h3>
                    <div className="space-y-4">
                        {alerts.length === 0 ? (
                            <p className="text-slate-500 text-sm">No critical alerts.</p>
                        ) : (
                            alerts.map((alert, i) => {
                                const days = Math.ceil((new Date(alert.date) - new Date()) / (1000 * 60 * 60 * 24));
                                return (
                                    <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-red-50/50 border border-red-100">
                                        <AlertCircle className={`w-5 h-5 ${days < 7 ? 'text-red-500' : 'text-orange-500'}`} />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-slate-700">{alert.label}</p>
                                            <p className="text-xs text-slate-500">Expires in {days} days</p>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
