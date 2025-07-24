"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useRouter } from "next/navigation";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CheckoutPage({ amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  const item = useSelector((state) => state.listings.item);
  const data = useSelector((state) => state.formdata.data);

  useEffect(() => {
    fetch("/api/webhooks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleDialogClose = () => {
    setDialogOpen(false);
    router.push("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: "http://localhost:3000",
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setDialogOpen(true);

      // Save Booking To DB
      try {
        const bookingdetails = {
          userInfo: {
            name: data.userinfo.username,
            email: data.userinfo.useremail,
            phone: data.userinfo.phone,
          },
          vehicleInfo: {
            name: data.vehicleinfo.name,
            model: data.vehicleinfo.model,
            pricePerDay: data.vehicleinfo.price,
          },
          bookingDetails: {
            startDate: data.bookingdata.startDate,
            endDate: data.bookingdata.endDate,
            totalDays: data.bookingdata.totalDays,
            price: data.bookingdata.totalprice,
            status: "pending",
          },
          createdAt: new Date().toISOString(),
        };

        const response = await fetch("/api/Booking_Save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingdetails),
        });

        if (!response.ok) {
          throw new Error("Failed to save booking.");
        }
      } catch (error) {
        console.error("Booking failed:", error);
        alert("Something went wrong. Please try again.");
      }
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
        {clientSecret && <PaymentElement />}
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}

        <button
          disabled={!stripe || loading}
          className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
        >
          {!loading ? `Pay $${amount}` : "Processing..."}
        </button>
      </form>

      {/* ✅ Dialog Section */}
      <Dialog
        open={dialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDialogClose}
        aria-describedby="success-dialog-description"
        PaperProps={{
          sx: {
            backgroundColor: "#000",
            color: "#fff", 
            border: "1px solid #4ade80", 
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle
          sx={{
            color: "#22c55e",
            fontFamily: "Funnel Display",
            fontOpticalSizing: "auto",
            fontWeight: "800",
            fontStyle: "normal",
          }}
        >
          ✅ Payment Successful!
        </DialogTitle>

        <DialogContent>
          <DialogContentText
            id="success-dialog-description"
            sx={{
              color: "#d1d5db",
              fontFamily: "Funnel Display",
              fontOpticalSizing: "auto",
              fontWeight: "400",
              fontStyle: "normal",
            }}
          >
            Thank you for your purchase. Your payment of ${amount} was
            successful. Our eam will contact you soon stay alert!
          </DialogContentText>
        </DialogContent>

        <DialogActions
          sx={{
            borderTop: "1px solid #1f2937", // gray-800
            padding: "16px",
          }}
        >
          <Button
            onClick={handleDialogClose}
            variant="contained"
            sx={{
              backgroundColor: "#22c55e", // green-500
              color: "#000", // black text
              fontFamily: "Funnel Display",
              fontOpticalSizing: "auto",
              fontWeight: "800",
              fontStyle: "normal",
              "&:hover": {
                backgroundColor: "#16a34a", // green-600
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
