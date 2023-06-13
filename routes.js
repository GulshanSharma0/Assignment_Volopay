const express = require("express");
const router = express.Router();
const getTotalItemsSoldQ3 = require("./controllers/getTotalItemsSoldQ3");
const getMonthslySales = require("./controllers/getMonthslySales");
const getDeptPercentage = require("./controllers/getDeptPercentage");
const nthMostTotalItem = require("./controllers/nthMostTotalItem");

// GET /api/total_items
router.get("/total_items", getTotalItemsSoldQ3);
router.get("/nth_most_total_item", nthMostTotalItem);
router.get("/percentage_of_department_wise_sold_items", getDeptPercentage);
router.get("/get_monthly_sales", getMonthslySales);

module.exports = router;
