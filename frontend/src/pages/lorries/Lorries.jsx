import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Search, Filter, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Modal from '../../components/Modal';
import LorryForm from '../../components/forms/LorryForm';

const Lorries = () => {
    const [lorries, setLorries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLorry, setEditingLorry] = useState(null);

    const fetchLorries = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/lorries');
            setLorries(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching lorries:', err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLorries();
    }, []);

    const handleAddLorry = async (data) => {
        try {
            if (editingLorry) {
                await axios.put(`http://localhost:5000/api/lorries/${editingLorry._id}`, data);
            } else {
                await axios.post('http://localhost:5000/api/lorries', data);
            }
            fetchLorries();
            setIsModalOpen(false);
            setEditingLorry(null);
        } catch (err) {
            console.error('Error saving lorry:', err);
        }
    };

    const handleDeleteLorry = async (id) => {
        if (window.confirm('Are you sure you want to delete this lorry?')) {
            try {
                await axios.delete(`http://localhost:5000/api/lorries/${id}`);
                fetchLorries();
            } catch (err) {
                console.error('Error deleting lorry:', err);
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Lorry Management</h2>
                    <p className="text-slate-500">Manage your fleet, track status and documents</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setEditingLorry(null); setIsModalOpen(true); }}
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-indigo-600/20"
                >
                    <Plus className="w-5 h-5" /> Add New Lorry
                </motion.button>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingLorry ? "Edit Lorry" : "Add New Lorry"}
            >
                <LorryForm
                    onSubmit={handleAddLorry}
                    onCancel={() => setIsModalOpen(false)}
                    initialData={editingLorry}
                />
            </Modal>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by vehicle number..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
                            <tr>
                                <th className="p-4 font-semibold">Vehicle Number</th>
                                <th className="p-4 font-semibold">Model</th>
                                <th className="p-4 font-semibold">Status</th>
                                <th className="p-4 font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                            {lorries.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-500">No lorries found. Add one to get started.</td>
                                </tr>
                            ) : (
                                lorries.map((lorry) => (
                                    <tr key={lorry._id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-4 font-bold text-slate-800">{lorry.vehicleNumber}</td>
                                        <td className="p-4">{lorry.model}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${lorry.status === 'available' ? 'bg-green-100 text-green-700' :
                                                    lorry.status === 'on-trip' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-orange-100 text-orange-700'
                                                }`}>
                                                {lorry.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => { setEditingLorry(lorry); setIsModalOpen(true); }}
                                                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteLorry(lorry._id)}
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

export default Lorries;
