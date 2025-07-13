import { test } from "vitest";
import { render } from "@testing-library/react";
import Restaurants from "./index";

test("Restaurants - no restaurants", async () => {
  render(<Restaurants restaurants={[]} />);
});

test("Restaurants - with restaurants", async () => {
  render(
    <Restaurants
      restaurants={[
        {
          id: 1,
          name: "A name",
          description: "A description",
          address: "123 Main St",
          phone: "1234567890",
          userId: 1,
          createdAt: new Date(),
        },
      ]}
    />,
  );
});
