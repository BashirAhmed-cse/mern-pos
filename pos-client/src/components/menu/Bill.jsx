import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { gettotalPrice } from "../../redux/slices/cartslice";
import { createOrder , verifyOnlinePayment} from "../../https";


const Bill = () => {
  const customerData = useSelector((state) => state.customer);
  const cartData = useSelector((state) => state.cart);
  const total = useSelector(gettotalPrice);
  const taxRate = 5.25;
  const tax = (total * taxRate) / 100;
  const totalPriceWithTax = total + tax;

  const [paymentMethod, setPaymentMethod] = useState();
  const [paymentData, setPaymentData] = useState(null); // Store payment data for later verification

  const paymentMutation = useMutation({
    mutationFn: (reqData) => createOrder(reqData),
    onSuccess: (res) => {
      const { data } = res;
      if (data.success) {
        setPaymentData(data); // Store the payment data for verification later
        window.location.href = data.url; // Redirect to SSLCommerz payment page
      } else {
        enqueueSnackbar("Payment initiation failed!", { variant: "error" });
      }
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || "Something went wrong!";
      enqueueSnackbar(errorMessage, { variant: "error" });
    },
  });

  const handleOnlinePayment = () => {
    const reqData = {
      amount: totalPriceWithTax,
      cus_name: customerData?.customerName || "Guest",
      cus_email: "test@example.com",
      cus_phone: customerData?.customerPhone || "N/A",
    };

    paymentMutation.mutate(reqData);
  };
console.log("paymentData:",paymentData);
  // Handle payment verification after successful payment
  const handlePaymentVerification = async () => {
    if (!paymentData) {
      enqueueSnackbar("No payment data to verify.", { variant: "warning" });
      return;
    }

    try {
      const response = await verifyOnlinePayment(paymentData);
      if (response.data.success) {
        enqueueSnackbar("Payment verified successfully!", { variant: "success" });
        // Additional success logic, e.g., updating order status
      } else {
        enqueueSnackbar("Payment verification failed!", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Payment verification error!", { variant: "error" });
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">Items ({cartData.length})</p>
        <h1 className="text-[#f5f5f5] text-md font-bold">${total.toFixed(2)}</h1>
      </div>
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">Tax ({taxRate}%)</p>
        <h1 className="text-[#f5f5f5] text-md font-bold">${tax.toFixed(2)}</h1>
      </div>
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">Total With Tax</p>
        <h1 className="text-[#f5f5f5] text-md font-bold">${totalPriceWithTax.toFixed(2)}</h1>
      </div>
      <div className="flex items-center gap-3 px-5 mt-4">
        <button
          onClick={() => setPaymentMethod("Cash")}
          className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold ${
            paymentMethod === "Cash" ? "bg-[#383737]" : ""
          }`}
        >
          Cash
        </button>
        <button
          onClick={() => setPaymentMethod("Online")}
          className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold ${
            paymentMethod === "Online" ? "bg-[#383737]" : ""
          }`}
          disabled={paymentMutation.isLoading}
        >
          {paymentMutation.isLoading ? "Processing..." : "Online"}
        </button>
      </div>
      <div className="flex items-center gap-3 px-5 mt-4">
        <button
          className="bg-[#025cca] px-4 py-3 w-full rounded-lg text-[#f5f5f5] font-semibold text-lg"
        >
          Print Receipt
        </button>
        <button
          onClick={handleOnlinePayment}
          className="bg-[#f6b100] px-4 py-3 w-full rounded-lg text-[#1f1f1f] font-semibold text-lg"
        >
          Place Order
        </button>
      </div>

      {/* After payment is made, verify payment */}
      {paymentData && (
        <div className="mt-4">
          <button
            onClick={handlePaymentVerification}
            className="bg-[#00aaff] px-4 py-3 w-full rounded-lg text-[#f5f5f5] font-semibold text-lg"
          >
            Verify Payment
          </button>
        </div>
      )}
    </>
  );
};

export default Bill;
