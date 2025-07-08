import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Pricing from ".";
import { getSubscriptionTypes } from "@/lib/db/actions/subscriptions";

// Mock the subscription actions
vi.mock("@/lib/db/actions/subscriptions", () => ({
  getSubscriptionTypes: vi.fn(),
}));

// Mock the PayButton component
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

  // expect(screen.getByText("Choose Your Plan")).toBeInTheDocument();
  // expect(screen.getByText("Basic")).toBeInTheDocument();
  // expect(screen.getByText("Pro")).toBeInTheDocument();
  // expect(screen.getByText("$10")).toBeInTheDocument();
  // expect(screen.getByText("$20")).toBeInTheDocument();
  // expect(screen.getByText("Feature 1")).toBeInTheDocument();
  // expect(screen.getByText("Feature 2")).toBeInTheDocument();
  // expect(screen.getByText("Feature 3")).toBeInTheDocument();
});
