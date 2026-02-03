import { useState } from 'react';
import { Plus } from 'lucide-react';

const DriverForm = ({ onSubmit, onCancel, initialData }) => {
    const [formData, setFormData] = useState(initialData || {
        name: '',
        phone: '',
        licenseNumber: '',
        licenseExpiry: '',
        salaryType: 'monthly'
    });

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
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Driver Name</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Ravi Kumar" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="9876543210" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">License Number</label>
                    <input type="text" name="licenseNumber" required value={formData.licenseNumber} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">License Expiry Date</label>
                    <input type="date" name="licenseExpiry" required value={formData.licenseExpiry} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Salary Type</label>
                    <select name="salaryType" value={formData.salaryType} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                        <option value="monthly">Monthly Salary</option>
                        <option value="trip-based">Trip-based Payment</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={onCancel} className="px-6 py-2 border border-slate-300 rounded-xl text-slate-600 hover:bg-slate-50 font-medium transition-colors">
                    Cancel
                </button>
                <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-medium transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Save Driver
                </button>
            </div>
        </form>
    );
};

export default DriverForm;
