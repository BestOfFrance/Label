import {Elements, PaymentElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe();

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