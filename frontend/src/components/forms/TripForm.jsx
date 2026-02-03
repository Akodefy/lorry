import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus } from 'lucide-react';

const TripForm = ({ onSubmit, onCancel, initialData }) => {
    const [formData, setFormData] = useState(initialData || {
        lorry: '',
        driver: '',
        fromLocation: '',
        toLocation: '',
        startDate: '',
        expectedReturn: '',

        loadType: '',
        weight: '',
        rate: '',
        totalValue: '',

        dieselCost: 0,
        tollCharges: 0,
        loadingUnloading: 0,
        driverAdvance: 0,
        otherExpenses: 0
    });

    const [lorryOptions, setLorryOptions] = useState([]);
    const [driverOptions, setDriverOptions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [lorriesRes, driversRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_API_URL}/api/lorries`),
                    axios.get(`${import.meta.env.VITE_API_URL}/api/drivers`)
                ]);
                setLorryOptions(lorriesRes.data);
                setDriverOptions(driversRes.data);
            } catch (error) {
                console.error("Error fetching form options:", error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Trip Details */}
                <div className="space-y-4">
                    <h4 className="font-semibold text-slate-700 border-b pb-2">Trip Details</h4>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Select Lorry</label>
                        <select name="lorry" required value={formData.lorry} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                            <option value="">Select Lorry</option>
                            {lorryOptions.map(lorry => (
                                <option key={lorry._id} value={lorry._id}>
                                    {lorry.vehicleNumber} ({lorry.model})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Select Driver</label>
                        <select name="driver" required value={formData.driver} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                            <option value="">Select Driver</option>
                            {driverOptions.map(driver => (
                                <option key={driver._id} value={driver._id}>
                                    {driver.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">From Location</label>
                        <input type="text" name="fromLocation" required value={formData.fromLocation} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">To Location</label>
                        <input type="text" name="toLocation" required value={formData.toLocation} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                        <input type="date" name="startDate" required value={formData.startDate} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Expected Return Date</label>
                        <input type="date" name="expectedReturn" value={formData.expectedReturn} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                </div>

                {/* Load & Cost Details */}
                <div className="space-y-6">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-slate-700 border-b pb-2">Load Details</h4>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Load Type</label>
                            <input type="text" name="loadType" placeholder="e.g. Rice, Steel" value={formData.loadType} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Weight (Tons)</label>
                                <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Value (Rs)</label>
                                <input type="number" name="totalValue" value={formData.totalValue} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-slate-700 border-b pb-2">Trip Costs</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Diesel Cost</label>
                                <input type="number" name="dieselCost" value={formData.dieselCost} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Toll Charges</label>
                                <input type="number" name="tollCharges" value={formData.tollCharges} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Loading/Unloading</label>
                                <input type="number" name="loadingUnloading" value={formData.loadingUnloading} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Driver Advance</label>
                                <input type="number" name="driverAdvance" value={formData.driverAdvance} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={onCancel} className="px-6 py-2 border border-slate-300 rounded-xl text-slate-600 hover:bg-slate-50 font-medium transition-colors">
                    Cancel
                </button>
                <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-medium transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Create Trip
                </button>
            </div>
        </form>
    );
};

export default TripForm;
