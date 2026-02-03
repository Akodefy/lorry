import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Search, Calendar, DollarSign, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

const Maintenance = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRecords = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/maintenance`);
            setRecords(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching maintenance records:', err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Maintenance & Service</h2>
                    <p className="text-slate-500">Track vehicle service history and costs</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-indigo-600/20"
                >
                    <Plus className="w-5 h-5" /> Add Service Record
                </motion.button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by vehicle..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
                            <tr>
                                <th className="p-4 font-semibold">Vehicle</th>
                                <th className="p-4 font-semibold">Service Type</th>
                                <th className="p-4 font-semibold">Date & Garage</th>
                                <th className="p-4 font-semibold">Cost</th>
                                <th className="p-4 font-semibold">Next Due</th>
                                <th className="p-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                            {records.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-slate-500">No maintenance records found.</td>
                                </tr>
                            ) : (
                                records.map((record) => (
                                    <tr key={record._id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-4 font-bold text-slate-800">{record.lorry ? record.lorry.vehicleNumber : 'N/A'}</td>
                                        <td className="p-4 flex items-center gap-2">
                                            <Wrench className="w-4 h-4 text-slate-400" /> {record.serviceType}
                                        </td>
                                        <td className="p-4">
                                            <div className="text-slate-800 font-medium">{new Date(record.serviceDate).toLocaleDateString()}</div>
                                            <div className="text-xs text-slate-500">{record.garageName}</div>
                                        </td>
                                        <td className="p-4 font-medium text-slate-700">₹{record.cost}</td>
                                        <td className="p-4 text-slate-500">{record.nextServiceDue ? new Date(record.nextServiceDue).toLocaleDateString() : '-'}</td>
                                        <td className="p-4 text-right">
                                            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">View Invoice</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Maintenance;
