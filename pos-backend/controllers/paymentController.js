const SSLCommerzPayment = require("sslcommerz-lts");
const config = require("../config/config");
const { v4: uuidv4 } = require("uuid");

const createOrder = async (req, res) => {
  try {
    const store_id = config.sslcommerzKeyId; // SSLCommerz Store ID
    const store_passwd = config.sslcommerzSecretKey; // SSLCommerz Store Password
    const is_live = false; // Change to true in production

    const { amount, cus_name, cus_email, cus_phone } = req.body;

    if (!amount || !cus_name || !cus_email || !cus_phone) {
      return res.status(400).json({ success: false, message: "Missing required fields!" });
    }

    const tran_id = uuidv4(); // Generate unique transaction ID

    const data = {
      total_amount: amount,
      currency: "BDT",
      tran_id,
      success_url: "http://localhost:8000/payment/success",
      fail_url: "http://localhost:8000/payment/fail",
      cancel_url: "http://localhost:8000/payment/cancel",
      ipn_url: "http://localhost:8000/payment/ipn",
      shipping_method: "Courier",
      product_name: "Order Payment",
      product_category: "Food",
      product_profile: "general",
      cus_name,
      cus_email,
      cus_add1: "Dhaka",
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone,
      ship_name: cus_name,
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: "1000",
      ship_country: "Bangladesh",
    };

    const sslcommerz = new SSLCommerzPayment(store_id, store_passwd, is_live);

    const response = await sslcommerz.init(data);

    if (response?.GatewayPageURL) {
      return res.status(200).json({ success: true, url: response.GatewayPageURL });
    } else {
      return res.status(400).json({ success: false, message: "Payment session creation failed" });
    }
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const verifyPayment = async (req, res, next) => {
    try {
      const store_id = config.sslcommerzKeyId;
      const store_passwd = config.sslcommerzSecretKey;
      const is_live = false;
  
      const { val_id, tran_id, status } = req.body; // SSLCommerz returns these fields
  console.log('check verfiy payment daya:', req.body);
      if (!val_id || !tran_id || !status) {
        return res.status(400).json({ success: false, message: "Invalid payment verification request!" });
      }
  
      // Call SSLCommerz validation API
      const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
      const validationUrl = `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${val_id}&store_id=${store_id}&store_passwd=${store_passwd}&format=json`;
  
      const response = await fetch(validationUrl);
      const validationData = await response.json();
  
      if (validationData?.status === "success") {
        return res.status(200).json({
          success: true,
          message: "Payment verified successfully",
          data: validationData,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Payment verification failed",
          data: validationData,
        });
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      res.status(500).json({ success: false, message: "Server error during payment verification" });
    }
  };
  

module.exports = { createOrder,verifyPayment };
