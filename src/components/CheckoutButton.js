import React from "react"
import { API } from "aws-amplify"
import { loadStripe } from "@stripe/stripe-js"
import '@stripe/stripe-js'

const stripePromise = loadStripe('pk_live_51HBN9DHYehZq7RpT5G2AQtCNeTrPehX91poDIfiXG9nWpAwC9MoiFOhEwSbvJc2sFitsSX6lyPVzykDYMxrBuJgA00Kgeay5re')

export default function CheckoutButton(props) {
  const redirectToCheckout = async () => {
    const fetchSession = async () => {
      const apiName = "stripeAPI"
      const apiEndpoint = "/checkout"
      const data = {
        body: {
        quantity: 1,
        client_reference_id: "UniqueString",
        priceId: "price_1KYx2lHYehZq7RpTFEXxebG2"
        }
      }
      const session = await API.post(apiName, apiEndpoint, data)
      console.log(session)
      return session
    }

    const session = await fetchSession()
    console.log(fetchSession())
    const sessionId = session.id
    const stripe = await stripePromise
    stripe.redirectToCheckout({ sessionId })
  }

  return <button onClick={redirectToCheckout}>Continue to payment</button>
}

