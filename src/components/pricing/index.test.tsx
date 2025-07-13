import {  test, vi } from "vitest";
import { render } from "@testing-library/react";
import Pricing from ".";
import { getSubscriptionTypes } from "@/lib/db/actions/subscriptions";

vi.mock("@/lib/db/actions/subscriptions", () => ({
  getSubscriptionTypes: vi.fn(),
}));

vi.mock("./pay-button", () => ({
  default: ({
    planId,
    price,
    planName,
  }: {
    planId: number;
    price: number;
    planName: string;
  }) => (
    <button data-testid={`pay-button-${planId}`}>
      Pay ${price / 100} for {planName}
    </button>
  ),
}));

test("Pricing component renders correctly", async () => {
  const mockSubscriptionTypes: Awaited<
    ReturnType<typeof getSubscriptionTypes>
  > = [
    {
      id: 1,
      name: "Basic",
      price: 999,
      features: ["Feature 1", "Feature 2"],
      createdAt: new Date(),
      description: "Basic plan",
      duration: "month",
      subscriptionTypeAbilitiesId: 1,
    },
    {
      id: 2,
      name: "Pro",
      price: 1999,
      features: ["Feature 1", "Feature 2", "Feature 3"],
      createdAt: new Date(),
      description: "Pro plan",
      duration: "month",
      subscriptionTypeAbilitiesId: 2,
    },
  ];

  render(await Pricing({ subscriptionTypes: mockSubscriptionTypes }));
});
