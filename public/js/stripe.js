/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51N0JtESAvjWf29mFc04yQ4CaPJ5LF49mZ0yzBz5ECsCsb93p7cxJw4ifu8ZCs2K0vfDqfaoOIq1IaltgAcAm1kKD00Fr5xcc7v'
  );

  try {
    // 1. Get checkout session form API
    const session = await axios(
      `http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);
    // 2. Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
