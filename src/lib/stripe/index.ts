import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51RaugwGdmQIWpFFJt7IoqOZH0EdvERMuPX2tYO7R2aMDHsneA9fyIGNm5qmBedYf1qVjD37YQNA6LVAR8uCcH3jl00PRlDVwx0",
  {
    apiVersion: "2025-05-28.basil",
  },
);

export default stripe;
