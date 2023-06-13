const Analytics = require("../model");

const getTotalItemsSoldQ3 = async (req, res) => {
  try {
    const { start_date, end_date, department } = req.query;

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    const year = startDate.getFullYear();
    const q3StartDate = new Date(year, 6, 1); 
    const q3EndDate = new Date(year, 9, 0); 

    const totalItemsSold = await Analytics.aggregate([
      { $match: { date: { $gte: q3StartDate, $lte: q3EndDate }, department } },
      { $match: { date: { $gte: startDate, $lte: endDate } } },
      { $group: { _id: null, totalItems: { $sum: "$seats" } } },
    ]);

    const total = totalItemsSold.length > 0 ? totalItemsSold[0].totalItems : 0;

    res.json({ total });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = getTotalItemsSoldQ3;
