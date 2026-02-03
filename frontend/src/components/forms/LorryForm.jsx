import { useState } from 'react';
import { Plus, X } from 'lucide-react';

const LorryForm = ({ onSubmit, onCancel, initialData }) => {
    const [formData, setFormData] = useState(initialData || {
        vehicleNumber: '',
        model: '',
        registrationDate: '',
        ownerName: '',
        capacity: '',
        chassisNumber: '',
        engineNumber: '',
        roadTaxExpiry: '',
        insuranceExpiry: '',
        fitnessCertExpiry: '',
        permitExpiry: '',
        pollutionCertExpiry: '',
        nationalPermitExpiry: ''
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
                {/* Basic Details */}
                <div className="space-y-4">
                    <h4 className="font-semibold text-slate-700 border-b pb-2">Basic Details</h4>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Number</label>
                        <input type="text" name="vehicleNumber" required value={formData.vehicleNumber} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="TN-01-AB-1234" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Model / Type</label>
                        <input type="text" name="model" value={formData.model} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Registration Date</label>
                        <input type="date" name="registrationDate" value={formData.registrationDate} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Owner Name</label>
                        <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Capacity (Tons)</label>
                        <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Chassis Number</label>
                        <input type="text" name="chassisNumber" value={formData.chassisNumber} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Engine Number</label>
                        <input type="text" name="engineNumber" value={formData.engineNumber} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                </div>

                {/* Expiry Details */}
                <div className="space-y-4">
                    <h4 className="font-semibold text-slate-700 border-b pb-2">Document Expiry Tracking</h4>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Road Tax Expiry</label>
                        <input type="date" name="roadTaxExpiry" value={formData.roadTaxExpiry} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Insurance Expiry</label>
                        <input type="date" name="insuranceExpiry" value={formData.insuranceExpiry} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">FC Expiry</label>
                        <input type="date" name="fitnessCertExpiry" value={formData.fitnessCertExpiry} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Permit Expiry</label>
                        <input type="date" name="permitExpiry" value={formData.permitExpiry} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Pollution Cert Expiry</label>
                        <input type="date" name="pollutionCertExpiry" value={formData.pollutionCertExpiry} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">National Permit Expiry</label>
                        <input type="date" name="nationalPermitExpiry" value={formData.nationalPermitExpiry} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={onCancel} className="px-6 py-2 border border-slate-300 rounded-xl text-slate-600 hover:bg-slate-50 font-medium transition-colors">
                    Cancel
                </button>
                <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-medium transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Save Lorry
                </button>
            </div>
        </form>
    );
};

export default LorryForm;
