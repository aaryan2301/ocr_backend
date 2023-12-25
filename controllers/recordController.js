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

const updateRecord= asyncHandler(async (req,res)=>{
    
});

const deleteRecord= asyncHandler(async (req,res)=>{
    
});

module.exports={createRecord, displayRecord, updateRecord, deleteRecord};