import { PaymentElement, useCheckout } from "@stripe/react-stripe-js";

export const Payment = () => {
  const checkout = useCheckout();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const confirmResult = await checkout.confirm();
    console.log(confirmResult);
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
  };

  return (
    <div className="container mx-auto py-8">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-center mb-8 text-white">
          Complete Your Payment
        </h1>

        <PaymentElement id="payment-element" />

        <button id="submit">Pay ${checkout.total.total.amount} now</button>
      </form>
    </div>
  );
};
