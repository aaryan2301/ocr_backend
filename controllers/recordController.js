const asyncHandler= require("express-async-handler");
const Record= require("../models/recordModel");
const uuid = require('uuid');

const createRecord= asyncHandler(async (req,res)=>{
    const { ocrResult, timestamp, status } = req.body;
    const generateCustomId = () => {
        return uuid.v4(); // This generates a random UUID
    };
    const customId = generateCustomId();
    if(!ocrResult){
        status="failure";
    }
    const record= await Record.create({
        customId,
        ocrResult,
        timestamp,
        status,
    });
    res.status(201).json(record);
}); 

const displayRecord= asyncHandler(async (req,res)=>{
    const records = await Record.find({}); // Fetch all records
    res.status(200).json(records);
}); 

const filterRecord = asyncHandler(async (req, res) => {
    const filterCriteria  = req.params.type;
    try {
      let filteredRecords;
  
      if (filterCriteria === "name") {
        filteredRecords = await Record.find().sort({first_name: 1});
      } else if (filterCriteria === "date_of_issue") {
        filteredRecords = await Record.find({}).sort({ date_of_issue: 1 });
      } else if (filterCriteria === "date_of_expiry") {
        filteredRecords = await Record.find({}).sort({ date_of_expiry: 1 });
      } else if (filterCriteria === "status") {
        filteredRecords = await Record.find({ status: "success" });
      }
  
      res.status(200).json(filteredRecords);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

const deleteRecord= asyncHandler(async (req,res)=>{
    const { id } = req.params; // Assuming the customId is passed as a parameter in the URL
  
  try {
    const deletedRecord = await Record.findOneAndDelete({ customId: id });

    if (!deletedRecord) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports={createRecord, displayRecord, filterRecord, deleteRecord};