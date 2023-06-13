const Analytics = require("../model");

module.exports = async (req, res) => {
  try {
    let { item_by, start_date, end_date, n } = req.query;

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    n = parseInt(n);

    // MongoDB aggregation pipeline r
    let pipelineStages;
    if (item_by === "quantity") {
      pipelineStages = [
        { $match: { date: { $gte: startDate, $lte: endDate } } },
        { $group: { _id: "$software", totalSoldQuantity: { $sum: "$seats" } } },
        { $sort: { totalSoldQuantity: -1 } },
        { $skip: n - 1 },
        { $limit: 1 },
      ];
    } else if (item_by === "price") {
      pipelineStages = [
        { $match: { date: { $gte: startDate, $lte: endDate } } },
        {
          $group: {
            _id: "$software",
            totalPrice: { $sum: { $multiply: ["$seats", "$amount"] } },
          },
        },
        { $sort: { totalPrice: -1 } },
        { $skip: n - 1 },
        { $limit: 1 },
      ];
    }

    const result = await Analytics.aggregate(pipelineStages).exec();

    // Check if there is a result
    if (result.length === 0) {
      throw new Error("No item found for the specified criteria.");
    }

    // get the item name from the result
    const itemName = result[0]._id;

    return res.json(itemName);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
