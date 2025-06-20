"use client";

import { Button } from "../ui/button";
import { handleCheckout } from "./actions";

interface PayButtonProps {
  planId: number;
  price: number;
  planName: string;
}

const PayButton = ({ planId, price, planName }: PayButtonProps) => {
  return (
    <Button
      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
      onClick={() => handleCheckout(planId, price, planName)}
    >
      Get Started
    </Button>
  );
};

export default PayButton;
