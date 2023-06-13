const Analytics = require("../model");

async function getDeptPercentage(req, res) {
  try {
    const { start_date, end_date } = req.query;

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    //  query to retrieve the total sold seats for each department
    const departmentSoldSeats = await Analytics.aggregate([
      { $match: { date: { $gte: startDate, $lte: endDate } } },
      { $group: { _id: "$department", totalSoldSeats: { $sum: "$seats" } } },
    ]);

    // total sold seats across all departments
    let totalSoldSeats = 0;
    departmentSoldSeats.forEach((department) => {
      totalSoldSeats += department.totalSoldSeats;
    });

    // percentage of sold seats for each department
    const departmentPercentageMap = {};

    departmentSoldSeats.forEach((department) => {
      const percentage = (
        (department.totalSoldSeats / totalSoldSeats) *
        100
      ).toFixed(2);
      departmentPercentageMap[department._id] = `${percentage}%`;
    });

    return res.send(departmentPercentageMap);
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred");
  }
}

module.exports = getDeptPercentage;
