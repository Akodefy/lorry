import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Search, Map, Calendar, Clock, CheckCircle, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import Modal from '../../components/Modal';
import TripForm from '../../components/forms/TripForm';

const Trips = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // POD State
    const [isPodModalOpen, setIsPodModalOpen] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [podData, setPodData] = useState({
        receiverName: '',
        date: '',
        remarks: ''
    });

    const fetchTrips = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/trips`);
            setTrips(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching trips:', err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrips();
    }, []);

    const handleCreateTrip = async (data) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/trips`, data);
            fetchTrips();
            setIsModalOpen(false);
        } catch (err) {
            console.error('Error creating trip:', err);
        }
    };

    const [podFile, setPodFile] = useState(null);

    const openPodModal = (trip) => {
        setSelectedTrip(trip);
        setPodData({ receiverName: '', date: new Date().toISOString().split('T')[0], remarks: '' });
        setPodFile(null);
        setIsPodModalOpen(true);
    };

    const handleSubmitPod = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('receiverName', podData.receiverName);
            formData.append('date', podData.date);
            formData.append('remarks', podData.remarks);
            if (podFile) {
                formData.append('podImage', podFile);
            }

            // Using the specific POD route we created
            await axios.put(`${import.meta.env.VITE_API_URL}/api/trips/${selectedTrip._id}/pod`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            fetchTrips();
            setIsPodModalOpen(false);
        } catch (err) {
            console.error('Error updating POD:', err);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-700';
            case 'Ongoing': return 'bg-blue-100 text-blue-700';
            case 'Created': return 'bg-purple-100 text-purple-700';
            case 'Cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Trip Management</h2>
                    <p className="text-slate-500">Track trips, loads, and delivery status</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsModalOpen(true)}
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-indigo-600/20"
                >
                    <Plus className="w-5 h-5" /> New Trip
                </motion.button>
            </div>

            {/* Create Trip Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create New Trip"
            >
                <TripForm
                    onSubmit={handleCreateTrip}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>

            {/* POD Modal */}
            <Modal
                isOpen={isPodModalOpen}
                onClose={() => setIsPodModalOpen(false)}
                title="Proof of Delivery (POD)"
            >
                <form onSubmit={handleSubmitPod} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Receiver Name</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={podData.receiverName}
                            onChange={(e) => setPodData({ ...podData, receiverName: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Delivery Date</label>
                        <input
                            type="date"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={podData.date}
                            onChange={(e) => setPodData({ ...podData, date: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Remarks</label>
                        <textarea
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            rows="3"
                            value={podData.remarks}
                            onChange={(e) => setPodData({ ...podData, remarks: e.target.value })}
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">POD Document/Image</label>
                        <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => setPodFile(e.target.files[0])}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={() => setIsPodModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-50 border rounded-lg">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" /> Mark Completed
                        </button>
                    </div>
                </form>
            </Modal>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search trip ID, location..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
                            <tr>
                                <th className="p-4 font-semibold">Trip ID</th>
                                <th className="p-4 font-semibold">Route</th>
                                <th className="p-4 font-semibold">Vehicle & Driver</th>
                                <th className="p-4 font-semibold">Status</th>
                                <th className="p-4 font-semibold">Dates</th>
                                <th className="p-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                            {trips.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-slate-500">No trips found. Create one to get started.</td>
                                </tr>
                            ) : (
                                trips.map((trip) => (
                                    <tr key={trip._id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-4 font-bold text-indigo-600">{trip.tripId || 'N/A'}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">{trip.fromLocation}</span>
                                                <Map className="w-4 h-4 text-slate-400" />
                                                <span className="font-medium">{trip.toLocation}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-slate-800 font-medium">{trip.lorry ? trip.lorry.vehicleNumber : 'N/A'}</div>
                                            <div className="text-xs text-slate-500">{trip.driver ? trip.driver.name : 'N/A'}</div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(trip.status)}`}>
                                                {trip.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col text-xs text-slate-500">
                                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(trip.startDate).toLocaleDateString()}</span>
                                                <span className="flex items-center gap-1 text-slate-400"><Clock className="w-3 h-3" /> RET: {trip.expectedReturn ? new Date(trip.expectedReturn).toLocaleDateString() : '-'}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            {trip.status !== 'Completed' && (
                                                <button
                                                    onClick={() => openPodModal(trip)}
                                                    className="text-sm font-medium text-green-600 hover:text-green-800 flex items-center gap-1 ml-auto"
                                                >
                                                    <FileText className="w-4 h-4" /> POD
                                                </button>
                                            )}
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

export default Trips;
