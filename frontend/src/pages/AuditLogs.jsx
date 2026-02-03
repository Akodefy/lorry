import { useState, useEffect } from 'react';
import axios from 'axios';
import { Shield, Clock, Database, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AuditLogs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedLog, setExpandedLog] = useState(null);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/audit-logs');
                setLogs(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching audit logs:", error);
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    const toggleExpand = (id) => {
        setExpandedLog(expandedLog === id ? null : id);
    };

    const getActionColor = (action) => {
        switch (action) {
            case 'CREATE': return 'bg-green-100 text-green-700';
            case 'UPDATE': return 'bg-blue-100 text-blue-700';
            case 'DELETE': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <Shield className="w-8 h-8 text-indigo-600" />
                        System Audit Logs
                    </h2>
                    <p className="text-slate-500">Immutable record of all system activities</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
                            <tr>
                                <th className="p-4 font-semibold">Time</th>
                                <th className="p-4 font-semibold">Action</th>
                                <th className="p-4 font-semibold">Module</th>
                                <th className="p-4 font-semibold">User</th>
                                <th className="p-4 font-semibold">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                            {logs.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-500">No audit records found.</td>
                                </tr>
                            ) : (
                                logs.map((log) => (
                                    <>
                                        <tr key={log._id} className="hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => toggleExpand(log._id)}>
                                            <td className="p-4 text-slate-500 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4" />
                                                    {new Date(log.timestamp).toLocaleString()}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-md text-xs font-bold ${getActionColor(log.action)}`}>
                                                    {log.action}
                                                </span>
                                            </td>
                                            <td className="p-4 font-medium text-slate-800">
                                                <div className="flex items-center gap-2">
                                                    <Database className="w-4 h-4 text-slate-400" />
                                                    {log.collectionName}
                                                </div>
                                            </td>
                                            <td className="p-4 text-slate-600">
                                                {log.changedBy ? (log.changedBy.name || log.changedBy.email) : 'System/Unknown'}
                                            </td>
                                            <td className="p-4 text-slate-400">
                                                {expandedLog === log._id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                            </td>
                                        </tr>
                                        <AnimatePresence>
                                            {expandedLog === log._id && (
                                                <motion.tr
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="bg-slate-50"
                                                >
                                                    <td colSpan="5" className="p-4 border-b border-slate-100">
                                                        <div className="bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                                                            <pre>{JSON.stringify(log.changes, null, 2)}</pre>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            )}
                                        </AnimatePresence>
                                    </>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AuditLogs;
