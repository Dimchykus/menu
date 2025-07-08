import { expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ModalProvider } from "@/context/modals";
import ModalContainer from "@/views/modals";
import { getAllMenuData } from "./actions";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("@/auth", () => ({
  auth: vi.fn().mockResolvedValue({}),
}));

vi.mock("./actions", () => ({
  getAllMenuData: vi.fn().mockResolvedValue({
    1: {
      restaurantName: "A restaurant",
      restaurantId: 1,
      menus: {
        1: {
          menuName: "A menu",
          menuId: 1,
          order: 1,
          categories: {
            1: {
              categoryName: "A category",
              categoryId: 1,
              order: 1,
              dishes: {
                1: {
                  dishName: "A dish",
                  dishId: 1,
                  order: 1,
                },
                2: {
                  dishName: "A dish",
                  dishId: 2,
                  order: 2,
                },
              },
            },
          },
        },
      },
    },
  }),
}));

// Create a simple query client for testing
function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: false, // Disable retries in tests
      },
    },
  });
}

test("Dish Order Modal", async () => {
  // vi.mocked(getAllMenuData).mockResolvedValue({
  //   1: {
  //     restaurantName: "A restaurant",
  //     restaurantId: 1,
  //     menus: {
  //       1: {
  //         menuName: "A menu",
  //         menuId: 1,
  //         order: 1,
  //         categories: {
  //           1: {
  //             categoryName: "A category",
  //             categoryId: 1,
  //             order: 1,
  //             dishes: {
  //               1: {
  //                 dishName: "A dish",
  //                 dishId: 1,
  //                 order: 1,
  //               },
  //               2: {
  //                 dishName: "A dish",
  //                 dishId: 2,
  //                 order: 2,
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // });

  const queryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <ModalProvider defaultValues={{ dishOrder: true }}>
        <ModalContainer />
      </ModalProvider>
    </QueryClientProvider>,
  );

  await vi.dynamicImportSettled();
});
