const Lorry = require('../models/Lorry');
const Trip = require('../models/Trip');
const Driver = require('../models/Driver');

exports.getDashboardStats = async (req, res) => {
    try {
        const [totalLorries, activeTrips, totalDrivers] = await Promise.all([
            Lorry.countDocuments(),
            Trip.countDocuments({ status: { $ne: 'Completed' } }),
            Driver.countDocuments()
        ]);

        const monthlyRevenue = await Trip.aggregate([
            {
                $group: {
                    _id: null,
                    totalValue: { $sum: "$totalValue" }
                }
            }
        ]);

        // Aggregate revenue by month for the current year
        const currentYear = new Date().getFullYear();
        const revenueTrend = await Trip.aggregate([
            {
                $match: {
                    startDate: {
                        $gte: new Date(`${currentYear}-01-01`),
                        $lte: new Date(`${currentYear}-12-31`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: "$startDate" },
                    total: { $sum: "$totalValue" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const chartData = Array.from({ length: 12 }, (_, i) => {
            const monthData = revenueTrend.find(item => item._id === i + 1);
            return {
                name: new Date(0, i).toLocaleString('default', { month: 'short' }),
                income: monthData ? monthData.total : 0,
                expense: 0 // You can calculate expenses similarly if needed
            };
        });

        res.json({
            totalLorries,
            activeTrips,
            totalDrivers,
            monthlyRevenue: monthlyRevenue[0]?.totalValue || 0,
            revenueChart: chartData
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getExpiryAlerts = async (req, res) => {
    try {
        const today = new Date();
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(today.getDate() + 30);

        const expiringLorries = await Lorry.find({
            $or: [
                { insuranceExpiry: { $lt: thirtyDaysFromNow } },
                { roadTaxExpiry: { $lt: thirtyDaysFromNow } },
                { fitnessCertExpiry: { $lt: thirtyDaysFromNow } },
                { permitExpiry: { $lt: thirtyDaysFromNow } },
                { pollutionCertExpiry: { $lt: thirtyDaysFromNow } },
                { nationalPermitExpiry: { $lt: thirtyDaysFromNow } }
            ]
        });

        const alerts = expiringLorries.map(lorry => {
            const alertsList = [];
            if (lorry.insuranceExpiry < thirtyDaysFromNow) alertsList.push({ label: `${lorry.vehicleNumber} Insurance`, date: lorry.insuranceExpiry });
            if (lorry.roadTaxExpiry < thirtyDaysFromNow) alertsList.push({ label: `${lorry.vehicleNumber} Road Tax`, date: lorry.roadTaxExpiry });
            // Add other fields similarly...
            return alertsList;
        }).flat();

        res.json(alerts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
