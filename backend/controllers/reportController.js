const Trip = require('../models/Trip');

exports.getReports = async (req, res) => {
    try {
        const expenseStats = await Trip.aggregate([
            {
                $group: {
                    _id: null,
                    fuel: { $sum: "$dieselCost" },
                    toll: { $sum: "$tollCharges" },
                    maintenance: { $sum: "$otherExpenses" }, // Assuming maintenance is tracked here for now, or fetch from Maintenance model
                    salary: { $sum: "$driverAdvance" } // Using driver advance as proxy for now
                }
            }
        ]);

        // Mock weekly data for now as date aggregation is more complex and requires consistent date fields
        const tripData = [
            { name: 'Mon', trips: 0 },
            { name: 'Tue', trips: 0 },
            { name: 'Wed', trips: 0 },
            { name: 'Thu', trips: 0 },
            { name: 'Fri', trips: 0 },
            { name: 'Sat', trips: 0 },
            { name: 'Sun', trips: 0 },
        ];

        const expenseData = expenseStats.length > 0 ? [
            { name: 'Fuel', value: expenseStats[0].fuel },
            { name: 'Toll', value: expenseStats[0].toll },
            { name: 'Maintenance', value: expenseStats[0].maintenance },
            { name: 'Driver', value: expenseStats[0].salary }
        ] : [];

        res.json({ tripData, expenseData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
