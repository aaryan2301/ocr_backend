const express= require("express");
const router= express.Router();

const {createRecord, displayRecord, updateRecord, deleteRecord}= require("../controllers/recordController");

router.route("/create").post(createRecord);
router.route("/display").get(displayRecord);
router.route("/update/:id").post(updateRecord);
router.route("/delete/:id").delete(deleteRecord);

module.exports=router;