import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom'
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const searchParam = useSearchParams();
  // const amount = searchParam.get('amount')

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setPaymentError(error.message);
        setPaymentSuccess(false);
      } else {
        setPaymentError(null);
        setPaymentSuccess(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setPaymentError('Payment failed. Please try again.');
      setPaymentSuccess(false);
    }
  };

  return (
    <>
         {/* <CheckOutForm amount = {""} />  */}
    <form id="payment-form" onSubmit={handleSubmit}>
      <div >
        <label className="text-[25px] font-bold" htmlFor="card-element">
         <h2> Credit or debit card </h2>
        </label>
        <div id="card-element">
          <CardElement className="bg-white h-8 p-4 m-5" />
          
        </div>
      </div>
      <button className="text-[20px] font-bold" type="submit" disabled={!stripe}>
        Pay
      </button>
      {paymentError && <div>{paymentError}</div>}
      {paymentSuccess && <div>Payment successful!</div>}
    </form>
    </>
  );
};

export default Payment