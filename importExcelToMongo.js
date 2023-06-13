require("dotenv").config();
const xlsx = require("xlsx");
const moment = require("moment");
const AnalyticsModel = require("./model");
const db = require("./db");

db();

// Excel file path
const excelFilePath = "./data.csv";

async function insertData() {
  // clean the db
  await AnalyticsModel.deleteMany({});

  try {
    // Read the Excel file
    const workbook = xlsx.readFile(excelFilePath, { cellDates: true });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    // Insert data into MongoDB collection
    await AnalyticsModel.insertMany(jsonData);
    console.log("Data inserted successfully");
  } catch (error) {
    console.error("Error:", error);
  }
}

insertData();
