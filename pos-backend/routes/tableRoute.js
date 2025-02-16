const express = require("express");
const router = express.Router();
const { isVerifiedUser } = require("../middlewares/tokenVerifivation");
const { updateTable, getTables, addTable } = require("../controllers/tableController");

router.route("/").post(isVerifiedUser , addTable);
router.route("/").get(isVerifiedUser , getTables);
router.route("/:id").put(isVerifiedUser , updateTable);

module.exports = router;