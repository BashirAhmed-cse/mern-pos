const express = require("express");
const { isVerifiedUser } = require("../middlewares/tokenVerifivation");
const { createOrder, verifyPayment } = require("../controllers/paymentController");

const router = express.Router();
router.route("/create_Order").post(isVerifiedUser , createOrder);
router.route("/verify_payment").post(isVerifiedUser , verifyPayment);

router.post("/payment/success", (req, res) => {
    console.log("Payment Successful!", req.body);
    res.redirect("http://localhost:5173/");
    // res.redirect("http://localhost:8000/success");
  });

  router.post("/payment/fail", (req, res) => {
    console.log("Payment Failed!", req.body);
    res.redirect("http://localhost:5173/");
    // res.redirect("http://localhost:8000/fail");
  });

  router.post("/payment/cancel", (req, res) => {
    console.log("Payment Canceled!", req.body);
    res.redirect("http://localhost:5173/");
    // res.redirect("http://localhost:8000/cancel");
  });

module.exports = router;