import axios from "axios";

export const fetchPaymentClientSecret = async () => {
  const response = await axios.post(
    "http://localhost:3333/api/payments/create-checkout-session",
  );
  return response.data?.clientSecret;
};
