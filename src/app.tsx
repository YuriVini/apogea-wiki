import { AppRoutes } from "./routes";
import { GlobalProvider } from "./providers/global-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe, StripeCheckoutOptions } from "@stripe/stripe-js";
import { fetchPaymentClientSecret } from "./services/payments";

const stripePromise = loadStripe(
  "pk_test_51RY5hFIpG5P87zgLfRfMlrQWTsTcdv5xz2PPlChNY5ucQKJjfiL8qxUW0mk1cvJ3B19SLEoq2wJgVGysvdQ3ZEG7007vD7KV2Z",
);

export const queryClient = new QueryClient();

const options: StripeCheckoutOptions = {
  fetchClientSecret: fetchPaymentClientSecret,
  elementsOptions: {
    appearance: {
      theme: "night",
    },
  },
};

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-700">
      <QueryClientProvider client={queryClient}>
        <CheckoutProvider stripe={stripePromise} options={options}>
          <GlobalProvider>
            <AppRoutes />
          </GlobalProvider>
        </CheckoutProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
