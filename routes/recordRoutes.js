const express= require("express");
const router= express.Router();

const {createRecord, displayRecord, filterRecord, deleteRecord}= require("../controllers/recordController");

router.route("/create").post(createRecord);
router.route("/display").get(displayRecord);
router.route("/filter/:type").post(filterRecord);
router.route("/delete/:id").delete(deleteRecord);

module.exports=router;