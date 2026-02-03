import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Search, Filter, Edit, Trash2, Phone, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Modal from '../../components/Modal';
import DriverForm from '../../components/forms/DriverForm';

const Drivers = () => {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDriver, setEditingDriver] = useState(null);

    const fetchDrivers = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/drivers');
            setDrivers(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching drivers:', err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDrivers();
    }, []);

    const handleAddDriver = async (data) => {
        try {
            if (editingDriver) {
                await axios.put(`http://localhost:5000/api/drivers/${editingDriver._id}`, data);
            } else {
                await axios.post('http://localhost:5000/api/drivers', data);
            }
            fetchDrivers();
            setIsModalOpen(false);
            setEditingDriver(null);
        } catch (err) {
            console.error('Error saving driver:', err);
        }
    };

    const handleDeleteDriver = async (id) => {
        if (window.confirm('Are you sure you want to delete this driver?')) {
            try {
                await axios.delete(`http://localhost:5000/api/drivers/${id}`);
                fetchDrivers();
            } catch (err) {
                console.error('Error deleting driver:', err);
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Driver Management</h2>
                    <p className="text-slate-500">Manage drivers, licenses, and assignments</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setEditingDriver(null); setIsModalOpen(true); }}
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-indigo-600/20"
                >
                    <Plus className="w-5 h-5" /> Add New Driver
                </motion.button>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingDriver ? "Edit Driver" : "Add New Driver"}
            >
                <DriverForm
                    onSubmit={handleAddDriver}
                    onCancel={() => setIsModalOpen(false)}
                    initialData={editingDriver}
                />
            </Modal>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by name or license..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
                            <tr>
                                <th className="p-4 font-semibold">Driver Name</th>
                                <th className="p-4 font-semibold">Phone</th>
                                <th className="p-4 font-semibold">License No.</th>
                                <th className="p-4 font-semibold">Status</th>
                                <th className="p-4 font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                            {drivers.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-500">No drivers found. Add one to get started.</td>
                                </tr>
                            ) : (
                                drivers.map((driver) => (
                                    <tr key={driver._id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-4 font-bold text-slate-800 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                                                {driver.name.charAt(0)}
                                            </div>
                                            {driver.name}
                                        </td>
                                        <td className="p-4 flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-slate-400" /> {driver.phone}
                                        </td>
                                        <td className="p-4 font-mono text-slate-600">{driver.licenseNumber}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${driver.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                {driver.status || 'Active'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => { setEditingDriver(driver); setIsModalOpen(true); }}
                                                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteDriver(driver._id)}
                                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
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

export default Drivers;
