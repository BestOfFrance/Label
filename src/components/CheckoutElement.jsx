import {Elements, PaymentElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_live_51HBN9DHYehZq7RpT5G2AQtCNeTrPehX91poDIfiXG9nWpAwC9MoiFOhEwSbvJc2sFitsSX6lyPVzykDYMxrBuJgA00Kgeay5re');

export default function CheckoutElement(props){
  return (
  <Elements stripe={stripePromise}>
    <form >
      <PaymentElement />
      <button >Submit</button>
    </form>
  </Elements>
  )
};

// const MyComponent = (props) => {
//   const stripe = useStripe();
//   const elements = useElements();

//   // rest of the component
// };