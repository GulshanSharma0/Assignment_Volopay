const Analytics = require("../model");

module.exports = async (req, res) => {
  try {
    const { product, year } = req.query;

    const numericYear = parseInt(year);

    if (isNaN(numericYear)) {
      return res
        .status(400)
        .json({ error: "Invalid value for year parameter. Must be a number." });
    }

    const monthlySales = new Array(12).fill(0);

    const salesData = await Analytics.aggregate([
      {
        $match: {
          software: product,
          date: {
            $gte: new Date(numericYear, 0, 1),
            $lte: new Date(numericYear, 11, 31),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$date" },
          totalSales: { $sum: { $multiply: ["$seats", "$amount"] } },
        },
      },
    ]);

    salesData.forEach((data) => {
      const monthIndex = data._id - 1; // Month index is zero-based
      monthlySales[monthIndex] = data.totalSales;
    });

    res.send(monthlySales);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
